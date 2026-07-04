export function validateCampaign(campaign, { expectedCampaignId } = {}) {
  const scenes = Array.isArray(campaign?.scenes) ? campaign.scenes : [];
  const sceneIds = new Set(scenes.map((scene) => scene.id).filter(Boolean));
  const duplicateSceneIds = findDuplicates(scenes.map((scene) => scene.id).filter(Boolean));
  const adjacency = new Map([...sceneIds].map((sceneId) => [sceneId, []]));
  const invalidCampaignIds = [];
  const missingActiveSceneIds = [];
  const scenesWithoutId = [];
  const choicesWithoutNextSceneId = [];
  const missingNextSceneIds = [];
  const directLoops = [];

  if (expectedCampaignId && campaign?.id !== expectedCampaignId) {
    invalidCampaignIds.push({ expected: expectedCampaignId, actual: campaign?.id ?? null });
  }

  if (!campaign?.activeSceneId || !sceneIds.has(campaign.activeSceneId)) {
    missingActiveSceneIds.push(campaign?.activeSceneId ?? null);
  }

  scenes.forEach((scene, sceneIndex) => {
    if (!scene.id) {
      scenesWithoutId.push({ sceneIndex, title: scene.title ?? 'Sem titulo' });
    }

    (scene.choices ?? []).forEach((choice, choiceIndex) => {
      const reference = {
        sceneId: scene.id ?? `index:${sceneIndex}`,
        choiceId: choice.id ?? `index:${choiceIndex}`,
        label: choice.label ?? 'Sem rotulo',
      };

      if (!choice.nextSceneId && choice.action !== 'free') {
        choicesWithoutNextSceneId.push(reference);
        return;
      }

      if (choice.nextSceneId && !sceneIds.has(choice.nextSceneId)) {
        missingNextSceneIds.push({ ...reference, nextSceneId: choice.nextSceneId });
      }

      const isAllowedDirectLoop = choice.nextSceneId === scene.id && choice.allowDirectLoop;

      if (choice.nextSceneId && sceneIds.has(choice.nextSceneId) && !isAllowedDirectLoop) {
        adjacency.get(scene.id)?.push(choice.nextSceneId);
      }

      if (choice.nextSceneId === scene.id && !choice.allowDirectLoop) {
        directLoops.push(reference);
      }
    });

    if (scene.nextSceneId && !sceneIds.has(scene.nextSceneId)) {
      missingNextSceneIds.push({
        sceneId: scene.id ?? `index:${sceneIndex}`,
        choiceId: 'scene.nextSceneId',
        label: scene.title ?? 'Sem titulo',
        nextSceneId: scene.nextSceneId,
      });
    }
  });

  const reachableSceneIds = findReachableSceneIds(campaign?.activeSceneId, adjacency);
  const orphanSceneIds = [...sceneIds].filter((sceneId) => !reachableSceneIds.has(sceneId));
  const cycles = findCycles(adjacency);

  const report = {
    invalidCampaignIds,
    missingActiveSceneIds,
    scenesWithoutId,
    choicesWithoutNextSceneId,
    missingNextSceneIds,
    directLoops,
    duplicateSceneIds,
    orphanSceneIds,
    cycles,
  };

  return {
    valid: Object.values(report).every((entries) => entries.length === 0),
    sceneCount: scenes.length,
    choiceCount: scenes.reduce((total, scene) => total + (scene.choices?.length ?? 0), 0),
    ...report,
  };
}

function findReachableSceneIds(activeSceneId, adjacency) {
  const reachable = new Set();
  const pending = activeSceneId ? [activeSceneId] : [];

  while (pending.length > 0) {
    const sceneId = pending.pop();
    if (reachable.has(sceneId) || !adjacency.has(sceneId)) continue;
    reachable.add(sceneId);
    pending.push(...adjacency.get(sceneId));
  }

  return reachable;
}

function findCycles(adjacency) {
  let currentIndex = 0;
  const indices = new Map();
  const lowLinks = new Map();
  const stack = [];
  const onStack = new Set();
  const cycles = [];

  function visit(sceneId) {
    indices.set(sceneId, currentIndex);
    lowLinks.set(sceneId, currentIndex);
    currentIndex += 1;
    stack.push(sceneId);
    onStack.add(sceneId);

    adjacency.get(sceneId).forEach((nextSceneId) => {
      if (!indices.has(nextSceneId)) {
        visit(nextSceneId);
        lowLinks.set(sceneId, Math.min(lowLinks.get(sceneId), lowLinks.get(nextSceneId)));
      } else if (onStack.has(nextSceneId)) {
        lowLinks.set(sceneId, Math.min(lowLinks.get(sceneId), indices.get(nextSceneId)));
      }
    });

    if (lowLinks.get(sceneId) !== indices.get(sceneId)) return;

    const component = [];
    let currentSceneId;

    do {
      currentSceneId = stack.pop();
      onStack.delete(currentSceneId);
      component.push(currentSceneId);
    } while (currentSceneId !== sceneId);

    const isDirectLoop = component.length === 1
      && adjacency.get(sceneId).includes(sceneId);

    if (component.length > 1 || isDirectLoop) cycles.push(component);
  }

  adjacency.forEach((_, sceneId) => {
    if (!indices.has(sceneId)) visit(sceneId);
  });

  return cycles;
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();

  values.forEach((value) => {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  });

  return [...duplicates];
}
