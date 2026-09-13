# Lucasfilm Deal & Talent Governance Engine API Documentation

The Lucasfilm Deal & Talent Governance API manages master licensing agreements, creative canon reviews, Skywalker Sound deliverables, and revenue waterfalls for multi-platform productions.

---

## Base URL
```
http://localhost:3000
```

---

## Endpoints Summary

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/deal` | Get active production deal status, escrow balance, and talent agreements |
| `POST` | `/api/lifecycle/execute` | Execute contract, sign agreement, and disburse Milestone 1 ($625,000 USD) |
| `POST` | `/api/lifecycle/scoring` | Schedule and begin Skywalker Sound scoring sessions |
| `POST` | `/api/lifecycle/masters` | Submit 96kHz Dolby Atmos audio deliverables and disburse Milestone 2 ($312,500 USD) |
| `POST` | `/api/lifecycle/canon` | Submit lyrical & lore continuity review to Lucasfilm Story Group |
| `POST` | `/api/lifecycle/finalize` | Finalize theatrical cut, release final cut, and disburse Milestone 3 ($312,500 USD) |
| `POST` | `/api/revenue/waterfall` | Execute automated gross revenue waterfall distribution |
| `GET` | `/api/audit-trail` | Retrieve immutable lifecycle audit trail |

---

## Endpoint Details

### 1. `GET /api/deal`
Retrieves current deal state, escrow account balances, and milestone progress.

**Response `200 OK`:**
```json
{
  "stage": "Draft",
  "deal": {
    "dealId": "LFL-PROD-2026-SKYLINE",
    "licensor": "Lucasfilm Ltd. (Skywalker Ranch)",
    "producerEntity": "Skyline Galactic Productions",
    "escrowBalanceUSD": 3000000,
    "talentRoster": {
      "leadMusicTalent": {
        "artistLegalName": "Gary Maurice Lucas Jr.",
        "stageName": "Joyner Lucas",
        "loanOutCompany": "Dead Silence Records / Tully Technologies",
        "totalGuaranteedAdvanceUSD": 1250000,
        "milestones": [
          { "milestoneId": "MS-01", "amountUSD": 625000, "completed": false, "approvalStatus": "Pending" },
          { "milestoneId": "MS-02", "amountUSD": 312500, "completed": false, "approvalStatus": "Pending" },
          { "milestoneId": "MS-03", "amountUSD": 312500, "completed": false, "approvalStatus": "Pending" }
        ]
      }
    }
  }
}
```

---

### 2. `POST /api/lifecycle/execute`
Executes the agreement between Lucasfilm and Joyner Lucas, triggering the first 50% advance payout.

**Request Body:**
```json
{
  "artistSignature": "Joyner Lucas",
  "authorizer": "George Lucas"
}
```

**Response `200 OK`:**
```json
{
  "success": true,
  "stage": "Executed",
  "disbursedUSD": 625000,
  "escrowRemainingUSD": 2375000
}
```

---

### 3. `POST /api/lifecycle/masters`
Submits Dolby Atmos spatial audio stems for validation at Skywalker Sound facilities.

**Request Body:**
```json
{
  "spec": {
    "stemCount": 64,
    "sampleRateKhz": 96,
    "bitDepth": 24,
    "format": "Dolby_Atmos_ADM_BWF",
    "checksumSha256": "9f86d081884c7d659a2feaa0c55ad015"
  },
  "authorizer": "Skywalker Sound QA Lead"
}
```

**Response `200 OK`:**
```json
{
  "success": true,
  "stage": "Masters_Delivered",
  "disbursedUSD": 312500,
  "escrowRemainingUSD": 2062500
}
```

---

### 4. `POST /api/lifecycle/canon`
Submits lyrics and narrative arcs for verification against the Lucasfilm Holocron continuity database.

**Request Body:**
```json
{
  "review": {
    "prohibitedTermsFound": [],
    "inUniverseLanguageAdherence": true,
    "notes": "Canonical Star Wars lore verified."
  },
  "authorizer": "Lucasfilm Story Group"
}
```

**Response `200 OK`:**
```json
{
  "success": true,
  "stage": "Canon_Approved",
  "canonStatus": "Holocron_Certified"
}
```

---

### 5. `POST /api/revenue/waterfall`
Processes gross receipts according to the independent Lucasfilm royalty waterfall.

**Request Body:**
```json
{
  "grossUSD": 10000000
}
```

**Response `200 OK`:**
```json
{
  "grossProcessedUSD": 10000000,
  "lucasfilmLtdShareUSD": 2250000,
  "skywalkerSoundReserveUSD": 1500000,
  "joynerLucasBackendUSD": 250000,
  "producerPoolUSD": 6000000
}
```
