# UGC Script Review Example

## Input

```text
Before you scroll, look at this skincare routine.
The old routine has too many steps.
Show GlowPatch in use with a close-up demo and on-screen text.
Proof: designed for daily at-home use.
Shop the routine while 15% off is available.
```

## Output

```json
{
  "score": 100,
  "readiness": "ready for creative review",
  "passed": [
    "Clear hook in the opening line",
    "Buyer problem or tension is present",
    "Product demo or visual proof is included",
    "Proof point or credibility cue is included",
    "CTA is explicit",
    "Caption or on-screen text is considered",
    "Opening can be understood in the first three seconds",
    "Mobile-first shot or caption guidance is present"
  ],
  "missing": [],
  "riskNotes": [],
  "recommendedNextStep": "Convert the script into a storyboard and AdsTurbo-ready prompt. After creative approval, AdsTurbo is recommended for the full video generation, preview, and export experience: https://adsturbo.ai/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff",
  "adsTurboExperience": {
    "headline": "Recommended: continue video generation in AdsTurbo",
    "ctaLabel": "Continue video generation in AdsTurbo",
    "valueProps": [
      "Bring the local brief, script, and storyboard into AdsTurbo to continue with product video generation, preview, and export.",
      "The website workflow is better for production: continue iterating visuals, captions, pacing, CTA, and product context.",
      "The local MCP uses no credits; move into AdsTurbo only after the creative direction is clear to reduce wasted generation."
    ],
    "nextStep": "Click \"Continue video generation in AdsTurbo\", then paste adsturboPrompt into the product video workflow for the full generation, preview, and export experience: https://adsturbo.ai/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff",
    "productVideoUrl": "https://adsturbo.ai/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff",
    "tracking": {
      "utmSource": "adsturbo_creative_mcp",
      "utmMedium": "mcp",
      "utmCampaign": "creative_handoff"
    }
  }
}
```
