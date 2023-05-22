import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Container from '@/common/Container/Container';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import styles from './FranchiseFormPage.module.sass';
import CustomInput from '@/components/CustomInput/CustomInput';
import PhoneInput from '@/components/PhoneInput/PhoneInput';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import Button from '@/common/Button/Button';
import ButtonGroup from '@/components/ButtonGroupUpdated/ButtonGroup';
import Layout from '@/components/Layout/Layout';
import {
  CASH_TO_INVEST,
  HEAR_ABOUT_US_OPTIONS,
  TYPE_OF_FRANCHISING_OPTIONS,
  USA_STATES_OPTIONS,
} from '@/utilits/variables';

const errors = {
  phone: 'Mobile number is required.',
  fullName: 'Please provide a valid Full name.',
  email: 'Please provide a valid Email',
  cashToInvest: 'Please select cash available to invest.',
  howDoYouHearAboutUs: 'Please select this field.',
  sourcesOfIncome: 'This field is required',
  stateOfInterest: 'Kindly select state of interest.',
  sourcesOfIncome: 'This field is required',
  territory: 'This field is required',
  whyAreYouInterested: 'This field is required',
  isAgree: `Please check the box next to "I agree with Privacy Policy and Terms of Conditions" in order to proceed.`,
};

const franchisingSchema = yup.object({
  cashToInvest: yup.mixed().oneOf(CASH_TO_INVEST).required(errors.cashToInvest),
  email: yup.string().required('Email is required').email(errors.email),
  fullName: yup.string().required(errors.fullName),
  howDoYouHearAboutUs: yup
    .mixed()
    .oneOf(HEAR_ABOUT_US_OPTIONS)
    .required(errors.howDoYouHearAboutUs),
  isAgree: yup.boolean().oneOf([true], errors.isAgree),
  phone: yup.string().required(errors.phone),
  sourcesOfIncome: yup.string().required(errors.sourcesOfIncome),
  stateOfInterest: yup.mixed().oneOf(USA_STATES_OPTIONS).required(errors.stateOfInterest),
  territory: yup.string().required(errors.territory),
  whyAreYouInterested: yup.string().required(errors.whyAreYouInterested),
});

const DEFAULT_FRANCHISE_OPTION = TYPE_OF_FRANCHISING_OPTIONS[0];

const defaultValues = {
  cashToInvest: null,
  email: '',
  fullName: '',
  howDoYouHearAboutUs: null,
  isAgree: false,
  phone: '',
  sourcesOfIncome: '',
  stateOfInterest: null,
  territory: '',
  whyAreYouInterested: '',
  typeOfFranchising: DEFAULT_FRANCHISE_OPTION,
};

const FranchiseForm = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(franchisingSchema),
  });

  const onSubmit = (data) => {
    // TODO: send to API
  };

  return (
    <Container className={styles.franchiseFormContainer}>
      <div className={styles.innerWrapper}>
        <Heading className={styles.title}>
          <Text as="span" gradient>
            Franchising
          </Text>
        </Heading>
        <Text className={styles.description}>
          Hello there. Below is our Franchisee Intake Form. It’s used to get to know you better,
          understand your interest in our Method, and assess your current investment capacity. We
          look forward to reviewing your answers and proceeding with the franchise onboarding
          process as we see fit. Thank you!
        </Text>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            type="text"
            label="Full name"
            fieldName="fullName"
            placeholder="e.g John Doe"
            {...{ errors, register }}
          />
          <CustomInput
            type="email"
            label="Email"
            fieldName="email"
            placeholder="Email"
            {...{ errors, register }}
          />

          <Controller
            name="phone"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <PhoneInput id="franchising-phone" label="Phone" error={errors.phone} {...field} />
            )}
          />

          <CustomInput
            type="text"
            label="City or Territory of Interest"
            fieldName="territory"
            placeholder="e.g. Cardiff"
            {...{ errors, register }}
          />

          <Controller
            name="stateOfInterest"
            control={control}
            render={({ field }) => (
              <CustomSelect
                id="usa-state-select"
                label="State of Interest"
                options={USA_STATES_OPTIONS}
                placeholder="Please select from list."
                error={errors.stateOfInterest}
                {...field}
              />
            )}
          />

          <Controller
            name="cashToInvest"
            control={control}
            render={({ field }) => (
              <CustomSelect
                id="available-cash"
                label="Cash Available to Invest"
                options={CASH_TO_INVEST}
                error={errors.cashToInvest}
                placeholder="Please select from list."
                {...field}
              />
            )}
          />

          <CustomInput
            type="text"
            label="What are your current sources of income and/or profit?"
            fieldName="sourcesOfIncome"
            placeholder="e.g. $150k"
            {...{ errors, register }}
          />

          <Controller
            name="howDoYouHearAboutUs"
            control={control}
            render={({ field }) => (
              <CustomSelect
                id="how-did-you-hear-about-us"
                label="How did you hear about us?"
                options={HEAR_ABOUT_US_OPTIONS}
                error={errors.howDoYouHearAboutUs}
                placeholder="Please select from list."
                {...field}
              />
            )}
          />

          <CustomInput
            type="text"
            label="Why are you interested in The Smart Fit Method?"
            fieldName="whyAreYouInterested"
            placeholder="Text"
            {...{ errors, register }}
          />

          <div>
            <span className={styles.label}>Are you applying as a group?</span>
            <ButtonGroup
              options={TYPE_OF_FRANCHISING_OPTIONS}
              wrapperClassName={styles.typesBtnGroup}
              defaultOption={defaultValues.typeOfFranchising}
              onClick={(option) => setValue('typeOfFranchising', option)}
            />
          </div>

          <AgreementCheckbox error={errors.isAgree} {...{ register }} />

          <Button className={styles.submitBtn} type="submit" variant="primary">
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

const AgreementCheckbox = ({ error, register }) => {
  return (
    <div className={styles.agreeContainer}>
      <label htmlFor="agreement" className={styles.agreement}>
        <input id="agreement" type="checkbox" {...register('isAgree')} />
      </label>
      <div>
        <span className={styles.labelTitle}>
          By the sign I agree with{' '}
          <Link className={styles.link} href="/privacy-policy">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link className={styles.link} href="/">
            Terms of Conditions
          </Link>
        </span>
        {error && <div className={styles.error}>{error.message}</div>}
      </div>
    </div>
  );
};

FranchiseForm.getLayout = (page) => {
  return <Layout hasFooter={false}>{page}</Layout>;
};

export default FranchiseForm;
