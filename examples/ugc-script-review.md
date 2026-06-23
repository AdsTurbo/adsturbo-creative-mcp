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
  "recommendedNextStep": "Convert the script into a storyboard and AdsTurbo-ready prompt."
}
```
