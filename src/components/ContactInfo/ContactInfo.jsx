import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import styles from './ContactInfo.module.sass';
import Button from '@/common/Button/Button';
import PhoneInput from '@/components/PhoneInput/PhoneInput';
import DateInput from '@/components/DateInput/DateInput';
import CustomInput from '@/components/CustomInput/CustomInput';
import { useBookFreeWorkoutContext } from '@/context/BookFreeWorkoutContext';
import CustomSelect from '../CustomSelect/CustomSelect';
import { GENDER_OPTIONS } from '@/utilits/variables';

const errors = {
  firstName: 'Please provide a valid First Name.',
  lastName: 'Please provide a valid Last Name.',
  phone: 'Mobile number already registered',
  dateOfBirth: 'Please provide a valid Date',
  email: 'Please provide a valid Email',
  gender: 'Please Select Gender ',
};

const contactInfoSchema = yup.object({
  firstName: yup.string().required(errors.firstName),
  lastName: yup.string().required(errors.lastName),
  email: yup.string().required('Email is required').email(errors.email),
  phone: yup.string().required(errors.phone),
  gender: yup.mixed().oneOf(GENDER_OPTIONS).required(errors.gender),
  dateOfBirth: yup.date().required(errors.dateOfBirth).typeError('Date of birth is required'),
});

const defaultValues = {
  firstName: '',
  lastName: '',
  phone: '',
  dateOfBirth: '',
  gender: null,
};

const ContactInfo = () => {
  const context = useBookFreeWorkoutContext();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(contactInfoSchema),
  });

  const onSubmit = (data) => {
    context.setValues({ contacts: data });
    context.handleNext();
  };

  return (
    <div className={styles.contactInfoContainer}>
      <Heading className={styles.title}>
        <Text gradient as="span">
          Contact Info
        </Text>
      </Heading>

      <form className={styles.contactForm} onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          type="text"
          label="First name"
          fieldName="firstName"
          {...{ errors, register }}
        />

        <CustomInput type="text" label="Last name" fieldName="lastName" {...{ errors, register }} />

        <Controller
          name="phone"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <PhoneInput id="phone" label="Phone" error={errors.phone} {...field} />
          )}
        />

        <Controller
          name="dateOfBirth"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <DateInput
              id="dateOfBirth"
              name="dateOfBirth"
              label="Date of Birth"
              error={errors[field.name]}
              {...field}
            />
          )}
        />

        <CustomInput type="email" label="Email" fieldName="email" {...{ errors, register }} />

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <CustomSelect
              id="gender"
              label="Gender"
              options={GENDER_OPTIONS}
              error={errors.gender}
              placeholder="Select Gender"
              {...field}
            />
          )}
        />

        <div className={styles.prevBtnContainer}>
          <Button
            outlined
            variant="secondary"
            className={styles.prevBtn}
            onClick={context.handlePrev}
          >
            Previous
          </Button>
        </div>

        <div className={styles.nextBtnContainer}>
          <Button type="submit" outlined className={styles.nextBtn} variant="primary">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactInfo;
