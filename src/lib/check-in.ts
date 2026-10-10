export type Safety = 'clear' | 'concern' | 'urgent';
export type Experience = 'stiff' | 'strength' | 'curious';
export type Context = 'desk' | 'active' | 'mixed';
export type CheckIn = { safety: Safety; experience: Experience; context: Context };
export type Result = {
  kind: Safety;
  title: string;
  body: string;
  next: string;
  route: string;
  label: string;
};
const experiences: Record<Experience, Pick<Result, 'title' | 'body' | 'route' | 'label'>> = {
  stiff: {
    title: 'Start with a little variety.',
    body: 'Feeling stiff after sitting does not diagnose gluteal amnesia. If movement feels comfortable, try a small position change or easy walk and notice how you feel. You do not need to force a stretch.',
    route: 'reset/',
    label: 'Try a gentle movement break',
  },
  strength: {
    title: 'Give strength a little practice.',
    body: 'Not feeling a particular muscle is not proof it is inactive. A comfortable chair squat or supported hinge can be a starting point. Practice gradually; focus on what gets easier, not whether your butt burns.',
    route: 'moves/',
    label: 'Explore the movement guides',
  },
  curious: {
    title: 'Curiosity is a good starting point.',
    body: 'There is no need to go hunting for a problem. Learn what your glutes do, try a comfortable movement if you want to, and keep the activities you enjoy.',
    route: 'learn/',
    label: 'Meet your glute group',
  },
};
const contexts: Record<Context, string> = {
  desk: 'For a seated day: attach a comfortable movement break to one existing cue, like finishing a call. A reminder is an invitation, not a pass/fail test.',
  active:
    'For an active day: movement variety and recovery still matter. Add new loading gradually, and seek assessment for recurring pain rather than adding more exercises.',
  mixed:
    'For a variable day: choose a repeatable amount that fits your capacity. A small practice you can return to is enough to start.',
};
export const getCheckInResult = ({ safety, experience, context }: CheckIn): Result => {
  if (safety === 'urgent')
    return {
      kind: safety,
      title: 'Please get emergency care now.',
      body: 'New numbness around the groin, genitals, or anus, new bladder or bowel control changes, or severe/worsening weakness in both legs can need urgent emergency assessment, especially with back pain. This is not a reason to try glute exercises.',
      next: 'Call your local emergency number or go to an emergency department. Do not wait for this website or a movement routine to help.',
      route: 'learn/#get-help',
      label: 'Read the warning signs',
    };
  if (safety === 'concern')
    return {
      kind: safety,
      title: 'An assessment is the better next step.',
      body: 'Persistent or recurring pain, numbness, tingling, or weakness cannot be explained by a nickname. A clinician can help work out what is happening and what movement is appropriate.',
      next: 'Seek prompt medical advice for new or worsening weakness, spreading numbness, severe sudden pain, or fever with back pain. Arrange an assessment for other symptoms that persist or interfere with daily life.',
      route: 'learn/#get-help',
      label: 'Find out when to get help',
    };
  return { kind: safety, ...experiences[experience], next: contexts[context] };
};
