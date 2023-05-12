import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import InputMask from 'react-input-mask';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Container from '@/common/Container/Container';
import Heading from '@/common/Heading/Heading';
import Text from '@/common/Text/Text';
import styles from './RegistrationWorkout.module.sass';
import Button from '@/common/Button/Button';
import PhoneInput from '@/components/PhoneInput/PhoneInput';

const RegistrationWorkout = () => {
  return (
    <Container className={styles.wrapper}>
      <ContactInfo />
    </Container>
  );
};

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
  // TODO: validation for gender options;
  // gender: yup.test((v) => v.value !== '').required(errors.gender),
  dateOfBirth: yup.date().required(errors.dateOfBirth).typeError('Date of birth is required'),
});
const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Not specified', value: 'not specified' },
];

const selectCustomStyles = {
  option: (provided, state) => ({
    ...provided,
    padding: 20,
    backgroundColor: state.isSelected
      ? 'rgba(26, 188, 156, 0.6)'
      : state.isFocused
      ? 'rgba(189, 195, 199, 0.2)'
      : undefined,
  }),
  control: (provided) => ({
    ...provided,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    boxShadow: 'none',
    color: '#fff',
    height: 50,
    minHeight: 50,
    background:
      'linear-gradient(179.55deg, rgba(138, 135, 135, 0.2) -3.48%, rgba(75, 78, 91, 0.3) 48.02%, rgba(109, 110, 113, 0.2) 99.61%)',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition, color: '#FFF' };
  },
  input: (base) => ({
    ...base,
    color: '#FFF',
  }),
  container: (base) => ({
    ...base,
  }),
  placeholder: (base) => ({
    ...base,
    color: '#FFF',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#141417',
  }),
  valueContainer: (base) => ({
    ...base,
  }),
};

const ContactInfo = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      dateOfBirth: '',
      gender: null,
    },
    resolver: yupResolver(contactInfoSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Heading className={styles.title}>
        <Text gradient as="span">
          Choose Location
        </Text>
      </Heading>

      <form className={styles.contactForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label} htmlFor="firstName">
          First name
          <input id="firstName" {...register('firstName')} />
        </label>

        <label className={styles.label} htmlFor="lastName">
          Last name
          <input id="lastName" {...register('lastName')} />
        </label>

        <PhoneInput onChange={(value) => setValue('phone', value)} />

        <label className={styles.label} htmlFor="dateOfBirth">
          Date of birth
          <Controller
            name="dateOfBirth"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <InputMask
                id="dateOfBirth"
                {...field}
                mask="DD-MM-YYYY"
                maskChar=" "
                placeholder="DD-MM-YYYY"
                formatChars={{
                  Y: '[0-9]',
                  d: '[0-3]',
                  D: '[0-9]',
                  m: '[0-1]',
                  M: '[1-9]',
                }}
              >
                {(inputProps) => <input type="text" {...inputProps} />}
              </InputMask>
            )}
          />
        </label>

        <label className={styles.label} htmlFor="email">
          Email
          <input id="email" {...register('email')} />
        </label>

        <label>
          Gender
          <Controller
            name="gender"
            control={control}
            defaultValue={null}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                isClearable
                options={GENDER_OPTIONS}
                styles={selectCustomStyles}
                placeholder="Select gender"
              />
            )}
          />
        </label>

        <Button outlined className={styles.prevBtn} variant="primary">
          Previous
        </Button>
        <Button type="submit" outlined className={styles.nextBtn} variant="primary">
          Next
        </Button>
      </form>
    </div>
  );
};

export default RegistrationWorkout;
