# DPA completion — Mathias

Published draft: https://www.strapivo.com/dpa
Source: dpa.html
Status: draft 0.1, NOT effective. Publishing this draft does not satisfy incorporation of an operative DPA in a customer contract.

## Complete before making effective

1. Schedule 1: monitored privacy and incident contacts; actual processing operations and data categories; exact EU hosting and backup locations; personnel access countries; export formats/coverage; active-system deletion deadline; provider retention; maximum backup expiry and restore/deletion procedure.
2. Schedule 2: verify every proposed security commitment against actual practice. Fill authentication/MFA, workspace separation, encryption, device, patching, incident, backup/restore and deletion details. Revise unsupported commitments rather than merely removing the annotations.
3. Schedule 3: replace function placeholders with actual legal entities, addresses/privacy contacts, products, data received, purpose, countries of storage/inference/support access, retention and deletion, applicable processor terms and no-training settings. Include fallbacks and observability/support providers. Do not copy the marketing website vendor list without checking platform use.
4. For each AI deployment, verify region AND deployment type. An EU endpoint does not prove regional inference. Check global/data-zone/regional options, subprocessors, abuse monitoring, human access, retention and transfer safeguards.
5. Approve proposed operating choices: 30 days' subprocessor-change notice, 15 days to object, unresolved-objection procedure, included ordinary assistance, and coordinated audit rights.
6. Review with Cyprus counsel, especially liability, transfer mechanisms and interaction with the founding-customer contract. Article 28 performance responsibility cannot simply be shifted to an AI provider.
7. Resolve all “To be confirmed” and “Pending confirmation” fields. Identify a release version/effective date, archive the agreed version, and expressly incorporate it under each contract's amendment requirements. Do not retrospectively turn this draft into an agreed addendum.
8. Only then replace the draft status text, remove draft labels from metadata and footers, and change robots from noindex to index if desired. The status and metadata are intentionally conspicuous until completion.

## Editing and deployment

The page has a unique data-edit region for each clause/block and is registered in admin.js and api/_lib/editable-files.js. Existing admin functionality still depends on the site's authentication/CMS configuration; this task did not provision it. The reliable editing route is dpa.html in GitHub or a local checkout, followed by a push to main. The existing Deploy to Vercel workflow publishes main. No new database or CMS is introduced.

The operative legal text is in dpa.html. Update it directly rather than regenerating it from the original research draft. Each editable block is below the existing API's 5,000-character edit limit.

## Internal reference

See dpa-research.md for source references, legal rationale and the original confirmation list. Both documents are under memory/, excluded from deployment by .vercelignore. Do not link these internal notes from the public site.

## Contract alignment

Section 9.1 now promises EU platform/application database/file hosting and refers provider processing locations and safeguards to the DPA. Section 7.4 addresses shared-model training restrictions across all AI providers. Section 11.5 limits incorporation of outside policies and gives DPA priority on personal-data processing. The customer contract has a 30-day export window. Its DPA reference remains incomplete until a completed DPA is actually agreed.

