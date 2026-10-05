STRAPIVO DPA — RESEARCH, CONFIRMATIONS AND CONTRACT ALIGNMENT
5 October 2026 | supervised drafting report | no publication performed

DELIVERABLE
/tmp/strapivo-dpa-review/strapivo-dpa-draft.txt
Reusable B2B draft 0.2 with full clauses and three schedules; revised after coordinator review to remove the founding-customer-specific liability-cap recital and keep explanatory cautions outside operative terms. It is not ready for adoption with unresolved [CONFIRM] fields. Security clauses are proposed commitments, not audited implementation findings. This report and the draft are the only deliverables; no application, website, customer agreement, repository or external document was changed.

EVIDENCE BOUNDARY
Read-only context: /tmp/strapivo-terms-expected.txt, including the exact adopted section 11.5 confirmed by the coordinator. Company particulars and multiple AI-provider use are supplied facts, not registry or supplier diligence findings. The contract defines Client ownership, bespoke onboarding, strategy conversations, stored strategic context, setup plus access/support, section 7.4 training restrictions, sections 9.2–9.3 processor/security obligations, and a 30-day export window. The customer-specific dates and identity were intentionally not embedded in the reusable DPA.

No code or internal product documentation was needed or inspected. The coordinator subsequently relayed the user's confirmation that all STRAPIVO hosting is in the EU and that US-provider models are reached via EU servers, with Sweden/Azure given as an example and no direct US endpoints. This is user-confirmed architecture information, not verification of each deployment or processing chain. Provider legal entities, terms, deployment types, settings, overseas access, retention, certification, encryption coverage, staffing and export coverage remain unverified. EU endpoint routing alone does not prove that all inference, retention or support access stays in the EU. No existing DPA at the proposed URL is a supplied task fact, not a fresh website inspection.

The coordinator also reports that https://www.strapivo.com/privacy covers website visitors, early-access forms and website analytics/logs; it names PostHog EU, Vercel and Google Fonts and contemplates outside-EEA processing with SCCs. Those website disclosures are not evidence that these entities process platform Client Personal Data. The published website contact hello@strapivo.com is not assumed to be a monitored DPA incident channel. These website findings are attributed to the coordinator rather than an independent inspection by this worker.

PRIMARY SOURCES AND HOW THEY INFORMED THE DRAFT
Research performed on 5 October 2026. The draft is original drafting, not the Commission's unmodified standard clauses.

1. GDPR, Regulation (EU) 2016/679, official EUR-Lex:
https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng
Article 28 is the governing contract framework; Articles 29–36 cover authorised personnel, records, security, breach handling and assistance; Chapter V addresses transfers; Articles 77–83 preserve individual remedies and regulatory powers. Ordinary EUR-Lex page/PDF opens encountered its JavaScript anti-bot challenge. Official EUR-Lex indexed passages were accessible and checked for Articles 28, 32, 33 and 82; Article 28 structure was additionally cross-checked with the Irish regulator's guide below. Do not represent that a complete consolidated text was downloaded.
Relevant indexed official pages:
https://eur-lex.europa.eu/legal-content/EN/TXT/?qid=1612089500634&uri=CELEX%3A32016R0679
https://eur-lex.europa.eu/legal-content/EN/TXT/?qid=1748285539647&uri=CELEX%3A32016R0679
https://eur-lex.europa.eu/legal-content/EN/TXT/?qid=1756737742704&uri=CELEX%3A32016R0679

2. Irish Data Protection Commission, A Practical Guide to Controller-Processor Contracts:
https://www.dataprotection.ie/en/dpc-guidance/data-processing-agreements
https://www.dataprotection.ie/sites/default/files/uploads/2019-06/190624%20Practical%20Guide%20to%20Controller-Processor%20Contracts.pdf
Regulator cross-check for processing particulars, instructions, confidentiality, security, delegation, rights assistance, Articles 32–36 support, deletion/return and audit rights. It distinguishes mandatory processing terms from optional commercial liability provisions.

3. EDPB Guidelines 07/2020, final version 2.1:
https://www.edpb.europa.eu/system/files/2023-10/EDPB_guidelines_202007_controllerprocessor_final_en.pdf
Actual roles depend on facts; a meaningful processor agreement needs concrete implementation detail. Used to avoid calling the incomplete TOM schedule evidence of current compliance and to avoid relying on labels for provider roles. Relevant guidance: Part II, section 1.

4. EDPB Opinion 22/2024, adopted 7 October 2024:
https://www.edpb.europa.eu/system/files/2024-10/edpb_opinion_202422_relianceonprocessors-sub-processors_en.pdf
Supports visibility of identities throughout the processing chain, proportionate verification of guarantees, and transfer documentation. The register requires actual entities and ready access to contact information; function labels alone are insufficient. Relevant sections: 2.1–2.3. The opinion does not settle the enforceability of this particular Cyprus commercial cap.

5. European Commission, Standard Contractual Clauses overview:
https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en
Transfer SCCs: Decision (EU) 2021/914:
https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32021D0914
The Commission distinguishes controller/processor clauses from international-transfer clauses. Indexed official SCC text was checked for processor-to-processor module, government requests, suspension and required annex particulars. Draft clause 6 requires an appropriate actual instrument with the actual recipient; it does not pretend that a generic website reference executes unknown provider SCCs. Module Three may fit STRAPIVO-to-Subprocessor transfers, subject to the instrument's scope and actual parties; no module, adequacy decision or recipient eligibility has been assumed.

MINIMUM QUESTIONS BEFORE ADOPTION/PUBLICATION
Ask these as one operational evidence request; they do not block review of the draft itself.

1. Who actually receives Client Personal Data? Supply every hosting/storage/backup, AI (including fallback), logging/observability, support, communications and onboarding vendor and relevant downstream chain: legal entity, product, address/contact, role, data, countries of storage/processing/access, retention, and governing terms. For every AI product, confirm signed/applicable no-shared-training terms and required settings, including abuse monitoring and human review. If a vendor insists on independent use incompatible with the instructions, the processor label cannot fix it.

2. What exactly is configured behind the confirmed EU hosting and EU endpoints? Supply application/backup/access locations and every provider deployment type, inference location, retention and support-access arrangement, plus any required transfer instruments and assessments. For Azure, distinguish regional/geography, Data Zone and Global deployments; the coordinator identified Microsoft's official explanation at https://learn.microsoft.com/azure/ai-services/openai/how-to/deployment-types. Exact configured types were not supplied. Reconcile any non-EU processing with section 9.1 expressly; do not silently rely on DPA precedence to weaken the promise.

3. Can the security owner evidence the proposed Schedule 2 measures? Confirm access/MFA, workspace isolation, encryption coverage and key management, devices, changes/patches, monitoring and incident escalation, backup/restore practice, data inventory/deletion and review ownership. Replace or implement unverified commitments before signature. No certification or fixed incident-response SLA is invented.

4. What are the achievable return and erasure limits? Confirm export format and complete coverage, active-store deletion deadline, provider retention/deletion (including logs), maximum isolated-backup expiry and restoration deletion procedure. Include strategic memory and derived stores. The 30-day export window is known; it is not proof of a 30-day universal deletion capability. Identify any specific legally required retention.

5. Who handles instructions, incidents and rights, and what is the actual processing scope? Confirm monitored contacts and escalation backup, actual metadata and data classes, optional integrations/recordings, and whether special-category or other higher-risk processing is expected. Ordinary business data is assumed for drafting; the proposed special-data restriction needs operational approval.

6. Approve the contractual operating choices and incorporation method. Proposed choices are 30 days' advance Subprocessor notice, 15 days to object, no disputed new provider pending resolution, affected-service termination if no workable solution, ordinary assistance included with exceptional charges agreed in advance, and reasonable audit coordination without an absolute annual limit. Confirm release/version archive and deliver completed schedules before execution. Cyprus counsel should check the liability cap's enforceable scope and existing-contract adoption; the draft preserves mandatory rights rather than asserting that all GDPR exposure is capped.

CONTRACT MATCH AND DELIBERATE CLARIFICATIONS
• Sections 1 and 9.2: covers setup/onboarding as well as ongoing platform processing; reusable client identity and duration are incorporated from each Agreement.
• Sections 7.2 and 7.4: no independent purpose licence; shared-model training restriction reproduced in substance for all Client Data, not narrowed to personal data. No unsupported “zero retention” claim.
• Section 5.6: keeps 30 days for commonly usable export, adds controller choice, default deletion instruction, limited backup handling and confirmation. Deletion deadlines remain factual blanks.
• Sections 8.3 and 11.5: personal-data confidentiality continues while data remains personal despite the general three-year expiry. DPA priority makes that deliberate protection effective.
• Section 9.1: draft preserves the existing hosting commitment and flags its interpretation; no permission for unidentified third-country routing.
• Sections 9.3 and 9.4: baseline statutory security and assistance are not optional enterprise extras. No invented SLA, indemnity, accreditation or audit report.
• Sections 10.3–10.5: commercial claims share the Agreement's aggregate cap and exclusions only insofar as lawful. Article 28(4) performance responsibility remains with STRAPIVO; individual compensation, authorities and mandatory SCC/statutory rights are preserved. A customer cannot simply be directed to sue its AI provider. The existing contract cap is preceding-12-month fees paid/payable, but the reusable DPA refers to each governing Agreement rather than hard-coding that amount. No clause can guarantee immunity from provider misconduct or GDPR claims.
• Sections 5.4–5.5: financial consequences of DPA termination remain under the Agreement and mandatory law; no invented pro-rata refund of an earned setup fee. New objection-based affected-service termination is a deliberate proposed DPA right requiring approval, not an existing contract fact.
• Sections 11.3–11.5: urgent notices are not held until a deemed-receipt date; website updates alone do not amend existing agreements. Version must be supplied/archived; an absent DPA cannot be retroactively incorporated by later publication.

REVIEW RESULT
All Article 28(3)(a)–(h) elements are addressed in clauses 2–10; processing particulars and Client obligations are in clause 2 and Schedule 1; general authorisation and Article 28(4) responsibility are in clause 5; transfers and liability/version handling are in clauses 6, 11 and 1. The remaining work is factual completion, approval of proposed operational/commercial commitments, and legal review before adoption. Nothing was published or sent outside the authorised Orca coordination channel.
