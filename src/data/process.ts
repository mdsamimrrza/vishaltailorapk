export interface ProcessStep {
  id: number;
  titleKey: string;
  descKey: string;
  icon: "MessageCircle" | "Ruler" | "Shirt" | "Scissors" | "Hand" | "Package";
}

export const processSteps: ProcessStep[] = [
  { id: 1, titleKey: "process_step1_title", descKey: "process_step1_desc", icon: "MessageCircle" },
  { id: 2, titleKey: "process_step2_title", descKey: "process_step2_desc", icon: "Ruler" },
  { id: 3, titleKey: "process_step3_title", descKey: "process_step3_desc", icon: "Shirt" },
  { id: 4, titleKey: "process_step4_title", descKey: "process_step4_desc", icon: "Scissors" },
  { id: 5, titleKey: "process_step5_title", descKey: "process_step5_desc", icon: "Hand" },
  { id: 6, titleKey: "process_step6_title", descKey: "process_step6_desc", icon: "Package" },
];
