# Lucasfilm Deal & Talent Contract Governance Platform

A decentralized and deterministic contract management engine designed for independent multi-platform entertainment productions in collaboration with **Lucasfilm Ltd. (Skywalker Ranch)** and recording artist **Joyner Lucas**.

---

## 🌌 Overview

This system coordinates master licensing, canonical continuity enforcement, high-fidelity audio engineering validation, escrow funding, and revenue waterfall payouts for independent productions.

### Key Highlights
- **Independent Lucasfilm Canon Protocol**: Retains George Lucas and the Lucasfilm Story Group's absolute final cut and narrative continuity authority.
- **Joyner Lucas Talent & Scoring Rider**: Manages guaranteed advances ($1.25M), 96kHz Dolby Atmos mastering milestones, publishing splits (50/50 writer's share), and 2.5% gross backend points.
- **Skywalker Sound & ILM Allocation**: Enforces technical pipeline integration, dedicating 15% of gross box office/streaming revenue to Skywalker Sound post-production reserves.
- **State Machine Lifecycle & Escrow Guard**: Transitions sequentially (`Draft` → `Executed` → `Scoring_Sessions_Active` → `Masters_Delivered` → `Canon_Approved` → `Active_Distribution`) while guaranteeing escrow funding before disbursing milestones.

---

## 📁 Project Structure

```
lucasfilm-deal-governance/
├── package.json               # Node.js project configuration
├── lucasfilm_engine.js        # Core lifecycle service, state machine & mock API server
├── test_runner.js             # Automated unit test suite
├── API_DOCUMENTATION.md       # REST API endpoint reference and payload examples
└── README.md                  # System architecture, overview & quickstart guide
```

---

## 🚀 Quickstart

### 1. Run the Unit Test Suite
```bash
node test_runner.js
# or
npm test
```

### 2. Start the Mock REST API Server
```bash
node lucasfilm_engine.js
# or
npm start
```
The server will start listening at `http://localhost:3000`.

---

## 📊 Revenue Distribution Waterfall

All global gross box office, SVOD streaming, and syndication receipts follow a strict tiered waterfall:

1. **Tier 1 (22.5%)** → **Lucasfilm Ltd. Master Royalty**
2. **Tier 2 (15.0%)** → **Skywalker Sound & ILM Post-Production Reserve**
3. **Tier 3 (2.5%)** → **Joyner Lucas Gross Backend Points**
4. **Tier 4 (60.0%)** → **Producer Net Recoupment & Operating Pool**

---

## 🔒 Security & Audit Log

Every stage transition, milestone approval, checksum verification, and escrow disbursement is appended to an immutable in-memory audit log retrievable via `GET /api/audit-trail`.
