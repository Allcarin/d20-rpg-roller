import {
  ashesOfVeyrholm,
  CANONICAL_CAMPAIGN_ID,
} from '../src/data/campaigns/ashesOfVeyrholm.js';
import { validateCampaign } from '../src/data/campaigns/validateCampaign.js';

const report = validateCampaign(ashesOfVeyrholm, {
  expectedCampaignId: CANONICAL_CAMPAIGN_ID,
});

console.log(JSON.stringify(report, null, 2));

if (!report.valid) {
  process.exitCode = 1;
}
