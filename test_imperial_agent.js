// ============================================================================
// Imperial Agent Test Suite: Security Clearance & Canon Audit
// ============================================================================

const { ImperialAgent } = require('./imperial_agent');

console.log('=== RUNNING IMPERIAL AGENT (ISB) VERIFICATION SUITE ===\n');

let passed = 0;
let failed = 0;

function assert(desc, condition) {
  if (condition) {
    console.log('  [PASS] ' + desc);
    passed++;
  } else {
    console.error('  [FAIL] ' + desc);
    failed++;
  }
}

const agent = new ImperialAgent('ISB-TEST-SUPERVISOR-99');

// ----------------------------------------------------------------------------
// 1. Content Security & Banned Lexicon Scanning
// ----------------------------------------------------------------------------
console.log('1. Content Security & Lexical Scans:');

const cleanLore = 'Hyperspace coordinates locked for Tatooine. Outer Rim cartel freighter approaching the blockade.';
const cleanScan = agent.scanContentForSecurityBreaches(cleanLore);
assert('Clean Star Wars lore passes with 0 violations', cleanScan.passed && cleanScan.violationsCount === 0 && cleanScan.status === 'CLEARED_BY_ISB');

const breachLore = 'We took the hyperdrive to Disneyland in California to see the Marvel characters.';
const breachScan = agent.scanContentForSecurityBreaches(breachLore);
assert('Detects prohibited real-world terms (disney, disneyland, california, marvel)', !breachScan.passed && breachScan.violationsCount >= 3 && breachScan.status === 'SECURITY_VIOLATION_DETECTED');

const caseInsensitiveText = 'DISNEY corporate retcon on the timeline.';
const caseScan = agent.scanContentForSecurityBreaches(caseInsensitiveText);
assert('Performs case-insensitive breach detection (DISNEY, retcon)', !caseScan.passed && caseScan.violationsCount === 2);

// ----------------------------------------------------------------------------
// 2. Clearance Token Cryptography
// ----------------------------------------------------------------------------
console.log('\n2. Clearance Token Generation:');

const tokenObj = agent.issueClearanceToken('MS-02', { format: 'Dolby_Atmos_ADM_BWF', sampleRateKhz: 96 });
assert('Issues valid ISB prefix token', tokenObj.clearanceToken.startsWith('ISB-'));
assert('Includes authorized agent ID and timestamp', tokenObj.authorizedBy === 'ISB-TEST-SUPERVISOR-99' && typeof tokenObj.clearanceTimestamp === 'string');
assert('Binds correct deliverable ID', tokenObj.deliverableId === 'MS-02');

// ----------------------------------------------------------------------------
// 3. Comprehensive Milestone Audits (Joyner Lucas Rider)
// ----------------------------------------------------------------------------
console.log('\n3. Milestone Audit Logic:');

const validSpec = { format: 'Dolby_Atmos_ADM_BWF', sampleRateKhz: 96, stemCount: 64 };
const canonicalLyrics = 'From Nar Shaddaa to Coruscant level 1313, blaster on my hip, never bowing to the syndicate.';

const auditSuccess = agent.auditTalentMilestone('MS-02', validSpec, canonicalLyrics);
assert('Approves milestone when both audio spec and lyrics are fully canonical', auditSuccess.cleared && auditSuccess.clearance.clearanceToken.startsWith('ISB-'));

const lyricalViolationLyrics = 'Landed on Earth, chilling in Hollywood.';
const auditLyricalFail = agent.auditTalentMilestone('MS-02', validSpec, lyricalViolationLyrics);
assert('Rejects milestone when lyrics contain non-canonical real-world words', !auditLyricalFail.cleared && auditLyricalFail.reason.includes('banned non-canonical terminology'));

const invalidAudioSpec = { format: 'Stereo_WAV', sampleRateKhz: 44.1, stemCount: 2 };
const auditAudioFail = agent.auditTalentMilestone('MS-02', invalidAudioSpec, canonicalLyrics);
assert('Rejects milestone when audio does not meet Skywalker Sound 96kHz Dolby Atmos standard', !auditAudioFail.cleared && auditAudioFail.reason.includes('Skywalker Sound 96kHz Dolby Atmos'));

const lowSampleRateSpec = { format: 'Dolby_Atmos_ADM_BWF', sampleRateKhz: 48, stemCount: 64 };
const auditSampleRateFail = agent.auditTalentMilestone('MS-02', lowSampleRateSpec, canonicalLyrics);
assert('Rejects 48kHz Dolby Atmos stems below 96kHz threshold', !auditSampleRateFail.cleared);

// ----------------------------------------------------------------------------
// Summary
// ----------------------------------------------------------------------------
console.log('\n============================================================');
console.log(`TEST SUMMARY: ${passed} passed, ${failed} failed.`);
console.log('============================================================\n');

process.exit(failed > 0 ? 1 : 0);
