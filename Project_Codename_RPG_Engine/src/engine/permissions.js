export function getActiveRole(database) {
  return database.permissions.roles.find((role) => role.id === database.permissions.activeRoleId)
    ?? database.permissions.roles[0];
}

export function can(database, capability) {
  return Boolean(getActiveRole(database)?.capabilities.includes(capability));
}

export function setActiveRole(database, roleId) {
  return {
    ...database,
    permissions: {
      ...database.permissions,
      activeRoleId: roleId,
    },
  };
}

export function setRoleCapability(database, roleId, capability, enabled) {
  return {
    ...database,
    permissions: {
      ...database.permissions,
      roles: database.permissions.roles.map((role) => {
        if (role.id !== roleId) return role;
        const capabilities = new Set(role.capabilities);
        if (enabled) capabilities.add(capability);
        else capabilities.delete(capability);
        return { ...role, capabilities: [...capabilities].sort() };
      }),
    },
  };
}

