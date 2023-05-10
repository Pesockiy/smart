import React from "react";
import cx from "class-names";

import SectionContainer from "../SectionContainer/SectionContainer";
import Accordion from "@/common/Accordion/Accordion";
import Animation from "@/common/Animations/Animations";
import Heading from "@/common/Heading/Heading";
import Text from "@/common/Text/Text";

import styles from "./FaqSection.module.sass";

const faqItems = [
  {
    title: "Should i have something to eat before my vasper session?",
    body: "I love my workout with smart fitness method. I look forward to each sessions and the staff/ trainers are amazing. They guide you throughthe entire workout from the moment you arrive. I feel spoiled and whodoes not want to be spoiled while you work out.",
  },
  {
    title: "What should i wear?",
    body: "I love my workout with smart fitness method. I look forward to each sessions and the staff/ trainers are amazing. They guide you throughthe entire workout from the moment you arrive. I feel spoiled and whodoes not want to be spoiled while you work out.",
  },
  {
    title: "Why am i barefoot?",
    body: "I love my workout with smart fitness method. I look forward to each sessions and the staff/ trainers are amazing. They guide you throughthe entire workout from the moment you arrive. I feel spoiled and whodoes not want to be spoiled while you work out.",
  },
  {
    title: "Why is it so cold?",
    body: "I love my workout with smart fitness method. I look forward to each sessions and the staff/ trainers are amazing. They guide you throughthe entire workout from the moment you arrive. I feel spoiled and whodoes not want to be spoiled while you work out.",
  },
  {
    title: "I have a medical condition. Can I use Smart Fit Method?",
    body: "I love my workout with smart fitness method. I look forward to each sessions and the staff/ trainers are amazing. They guide you throughthe entire workout from the moment you arrive. I feel spoiled and whodoes not want to be spoiled while you work out.",
  },
  {
    title: "What does the AI do?",
    body: "I love my workout with smart fitness method. I look forward to each sessions and the staff/ trainers are amazing. They guide you throughthe entire workout from the moment you arrive. I feel spoiled and whodoes not want to be spoiled while you work out.",
  },
];

const FaqSection = () => {
  return (
    <section className={cx(styles.faq)}>
      <SectionContainer wrapper vCenter count="05" subtitle={"FAQ’s"}>
        <div className={styles.faqTextWrap}>
          <Heading size="xxl" className={styles.faqTitle}>
            <Text as="span" gradient>
              Your Questions.
            </Text>{" "}
            Answered.
          </Heading>
        </div>
        <div className={styles.faqContainer}>
          {/* <Animation> */}
          {faqItems.map(({ title, body }) => (
            <Accordion key={title} title={title} className={styles.faqItem}>
              {body}
            </Accordion>
          ))}
          {/* </Animation> */}
        </div>
      </SectionContainer>
    </section>
  );
};

export default FaqSection;
