import Link from 'next/link';
import cx from 'class-names';

import Container from '@/common/Container/Container';
import Heading from '@/common/Heading/Heading';
import styles from './PrivacyPolicy.module.sass';

const PrivacyPolicy = ({ privacyPolicy }) => {
  const links = privacyPolicy.items.map((item) => item.title);

  return (
    <Container className={styles.container}>
      <Heading className={styles.title}>Privacy Policy</Heading>

      <ul className={styles.mainList}>
        {privacyPolicy.description.map((item, idx) => {
          return (
            <li key={idx}>
              <p>{item}</p>
            </li>
          );
        })}
      </ul>

      <div className={styles.innerWrapper}>
        <div className={styles.linksWrapper}>
          <LinksList links={links} />
        </div>
        <div className={styles.mainContainer}>
          <ul className={styles.policyList}>
            {privacyPolicy.items.map((item, idx) => {
              return (
                <li id={item.title.toLowerCase().split(' ').join('-')} key={idx}>
                  <Heading as="h2" className={styles.subtitle}>
                    {item.title}
                  </Heading>

                  {item.description && (
                    <DescriptionList
                      className={styles.descriptionList}
                      description={item.description}
                    />
                  )}
                  {item.items && <DetailsList details={item.items} />}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Container>
  );
};

const DetailsList = ({ details }) => {
  return (
    <ul>
      {details.map((item, idx) => {
        return (
          <li key={idx}>
            <Heading as="h3" className={styles.detailsTitle}>
              {item.title}
            </Heading>

            {item.description && (
              <DescriptionList
                className={cx(styles.descriptionList, styles.detailsInfo)}
                description={item.description}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

const DescriptionList = ({ description, className }) => {
  return (
    <ul className={className}>
      {description.map((desc, idx) => {
        return (
          <li key={idx}>
            <p>{desc}</p>
          </li>
        );
      })}
    </ul>
  );
};

const LinksList = ({ links }) => {
  return (
    <ul className={styles.linksList}>
      {links.map((text, idx) => {
        return (
          <li key={idx}>
            <Link href={`#${text.toLowerCase().split(' ').join('-')}`} className={styles.link}>
              {text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      privacyPolicy: {
        title: null,
        description: [
          'Vasper Systems (“we”, “us” or “our”) values your privacy. In this Privacy Policy (“Policy”), we describe how we collect, use, and disclose information that we obtain about visitors to our website at www.vasper.com (the “Site”) and the services available through our Site (collectively, the “Services”), and how we use and disclose that information. ',
          'By visiting the Site, or using any of our Services, you agree that your personal information will be handled as described in this Policy. Your use of our Site or Services, and any dispute over privacy, is subject to this Policy and the Terms of Use, including its applicable limitations on damages and provisions for the resolution of disputes.',
        ],
        items: [
          {
            title: 'The Information We Collect About You',
            description: [
              `We collect information about you directly from you and from third parties, as well as automatically through your use of our Site or Services.`,
              `Information We Collect Directly From You. You may browse certain areas of the Site without registering with us or providing us personal information. However if you complete the contact us form at the Site, we will collect you name, email, phone number and country of residence. If you purchase or lease one of our Vasper systems or sign up for a membership, we may collect your name, email, address, phone number and certain credit and other financial information as necessary to complete the transaction.
              Information We Collect Automatically. We may automatically collect the following information about your use of our Site or Services through cookies and other technologies: your domain name; your browser type and operating system; web pages you view; links you click; your IP address; the length of time you visit our Site or use our Services; and the referring URL, or the webpage that led you to our Site. We may combine this information with other information that we have collected about you, including, where applicable, your user name, name, and other personal information Please see the section “Our Use of Cookies and Other Tracking Mechanisms” below for more information.`,
            ],
          },
          {
            title: 'How We Use Your Information',
            description: [
              'We use your information, including personal information, for the following purposes:',
            ],
            items: [
              {
                title: 'Provide our services',
                description: [
                  'We use your information to communicate with you about your use of our Site and Services, to respond to your inquiries, to fulfill your orders for the lease or purchase of our system or membership, and for other customer service purposes.',
                ],
              },
              {
                title: 'Provide personalized services',
                description: [
                  'We use your information to tailor the content and information that we may send or display to you, to offer location customization, and personalized help and instructions, and to otherwise personalize your experiences while using the Site and Services.',
                ],
              },
              {
                title: 'Improve and develop our services',
                description: [
                  'We use your information to ensure our Site and Services are working as intended, to better understand how users access and use our Site and Services, both on an aggregated and individualized basis, to make improvements to our services, to develop new Services, and for other research and analytical purposes.',
                ],
              },
              {
                title: 'Offer promotions',
                description: [
                  'We use your information for marketing and promotional purposes. For example, we may use your information, such as your email address, to send you news and newsletters, special offers, and promotions, to conduct contests and sweepstakes, or to otherwise contact you about products or information we think may interest you. We also may use the information that we learn about you to assist us in advertising our Services on third party websites.',
                ],
              },
            ],
          },
          {
            title: 'How We Share Your Information',
            description: [
              'We may share your information, including personal information, as follows:',
            ],
            items: [
              {
                title: 'Consent.',
                description: [
                  'Where you have provided consent, we share your information, including personal information, as described at the time of consent.',
                ],
              },
              {
                title: 'Affiliates.',
                description: [
                  'We may disclose the information we collect from you to our affiliates or subsidiaries solely for the purpose of providing Services to you; however, if we do so, their use and disclosure of your personally identifiable information will be maintained by such affiliates and subsidiaries in accordance with this Policy.',
                ],
              },
              {
                title: 'Service Providers.',
                description: [
                  'We may disclose the information we collect from you to third party vendors, service providers, contractors or agents who perform functions on our behalf.',
                ],
              },
              {
                title: 'Business Transfers.',
                description: [
                  'If we are acquired by or merged with another company, if substantially all of our assets are transferred to another company, including as part of a bankruptcy proceeding, or are in negotiations for any of these types of transactions, we may transfer the information we have collected from you to the other company.',
                ],
              },
              {
                title: 'In Response to Legal Process.',
                description: [
                  'We also may disclose the information we collect from you in order to comply with the law, a judicial proceeding, court order, or other legal process, such as in response to a subpoena.',
                ],
              },
              {
                title: 'To Protect Us and Others.',
                description: [
                  'We also may disclose the information we collect from you where we believe it is necessary to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the safety of any person, violations of our Terms of Useor this Policy, or as evidence in litigation in which we are involved.',
                ],
              },
              {
                title: 'Aggregate and De-Identified Information.',
                description: [
                  'We may share aggregate or de-identified information about users and their use of the Services with third parties and publicly for marketing, advertising, research or similar purposes.',
                  'Please note that except as noted above, we will not sell or share your personal information with any third party for their direct marketing purposes without your consent.',
                ],
              },
            ],
          },
          {
            title: 'Our Use of Cookies and Other Tracking Mechanisms',
            description: [
              'We and our service providers use cookies and other tracking mechanisms to track information about your use of our Site and Services. We may combine this information with other personal information we collect from you (and our third party service providers may do so on our behalf).',
              'Currently, our systems do not recognize browser “do-not-track” requests. You may, however, disable certain tracking as discussed in this section (e.g., by disabling cookies), but such disabling will impair use of the Site and Services.',
            ],
            items: [
              {
                title: 'Cookies.',
                description: [
                  'Cookies are alphanumeric identifiers that we transfer to your computer’s hard drive through your web browser for record-keeping purposes. Some cookies allow us to make it easier for you to navigate our Site and Services, while others are used to enable a faster log-in process or to allow us to track your activities at our Site and Services. There are two types of cookies: session and persistent cookies.',
                ],
              },
              {
                title: 'Session Cookies.',
                description: [
                  'Session cookies exist only during an online session. They disappear from your computer when you close your browser or turn off your computer. We use session cookies to allow our systems to uniquely identify you during a session or while you are logged into the Site. This allows us to process your online transactions and requests and verify your identity, after you have logged in, as you move through our Site.',
                ],
              },
              {
                title: 'Persistent Cookies.',
                description: [
                  'Persistent cookies remain on your computer after you have closed your browser or turned off your computer. We use persistent cookies to track aggregate and statistical information about user activity.',
                ],
              },
              {
                title: 'Disabling Cookies.',
                description: [
                  'Most web browsers automatically accept cookies, but if you prefer, you can edit your browser options to block them in the future. The Help portion of the toolbar on most browsers will tell you how to prevent your computer from accepting new cookies, how to have the browser notify you when you receive a new cookie, or how to disable cookies altogether. Visitors to our Site who disable cookies will not be able to browse certain areas of the Site or use the Services.',
                ],
              },
              {
                title: 'Third Party Analytics.',
                description: [
                  'We use automated devices and applications, such as Google Analytics, to evaluate usage of our Site and our Services. We also may use other analytic means to evaluate our Services. We use these tools to help us improve our Services, performance and user experiences. These entities may use cookies and other tracking technologies to perform their services. We do not share your personal information with these third parties.',
                ],
              },
              {
                title: 'Third-Party Links',
                description: [
                  'Our Site and Services may contain links to third-party websites. Any access to and use of such linked websites is not governed by this Policy, but instead is governed by the privacy policies of those third party websites. We are not responsible for the information practices of such third party websites.',
                ],
              },
              {
                title: 'Security of My Personal Information',
                description: [
                  'We have implemented commercially reasonable precautions to protect the information we collect from loss, misuse, and unauthorized access, disclosure, alteration, and destruction. Please be aware that despite our efforts, no data security measures can guarantee 100% security.',
                  'You should take steps to protect against unauthorized access to your password, phone, and computer by, among other things, signing off after using a shared computer, choosing a robust password that nobody else knows or can easily guess, and keeping your log-in and password private. We are not responsible for any lost, stolen, or compromised passwords or for any activity on your account via unauthorized password activity.',
                ],
              },
              {
                title: 'What Rights Do I Have Regarding My Personal Information',
                description: [
                  'You may request access, a copy, modification or deletion of personal information that you have submitted to us by contacting us at info@vasper.com We will use reasonable efforts to accommodate such requests to the extent required by law, provided that we may be required to retain personal information to comply with legal obligations, accounting requirements, or for other business purposes. We may request additional information to verify the identity of the requesting party before responding to a request. Please note that copies of information that you have updated, modified or deleted may remain viewable in cached and archived pages of the Site for a period of time.',
                ],
              },
              {
                title:
                  'What Choices Do I Have Regarding Use of My Personal Information for Marketing?',
                description: [
                  'We may send periodic promotional or informational emails to you. You may opt-out of such communications by following the opt-out instructions contained in the e-mail. Please note that it may take up to 10 business days for us to process opt-out requests. If you opt-out of receiving emails about recommendations or other information we think may interest you, we may still send you e-mails about your account or any Services you have requested or received from us.',
                ],
              },
              {
                title: 'Location of Information',
                description: [
                  'Our Site and Services are offered from the United States and currently intended only for use in the United States. We store any information we collect in the United States. If you access the Services or Site from outside the United States, you agree to the transfer of your information to the United States, which may have less protections for your personal information than your jurisdiction of residence.',
                ],
              },
              {
                title: 'Children Under 13',
                description: [
                  'Our Site and Services are not designed for children under 13. If we discover that a child under 13 has provided us with personal information, we will delete such information from our systems.',
                ],
              },
              {
                title: 'Contact Us',
                description: [
                  'If you have questions about the privacy aspects of our Site or Services or would like to make a complaint, please contact us at info@vasper.com.',
                ],
              },
              {
                title: 'Changes to this Policy',
                description: [
                  'This Policy is current as of the Effective Date set forth above. We may change this Policy from time to time, so please be sure to check back periodically. We will post any changes to this Policy on the Site. If we make any changes to this Policy that materially affect our practices with regard to the personal information we have previously collected from you, we will endeavor to provide you with notice in advance of such change by highlighting the change on our Site or if you have an account with us, providing notice to the email address in your account (for this reason you should make sure to update your account information promptly if it changes.',
                ],
              },
            ],
          },
          {
            title: 'Сalifornia privacy notice',
            description: [
              'Under California Civil Code § 1798.83, California residents who have provided personal information to Vasper may obtain information regarding Vasper’s disclosures, if any, of personal information to third parties for third-party direct marketing purposes. Requests must be submitted to the following address: NASA AMES RESEARCH PARK, 580 CODY ROAD, MOUNTAIN VIEW, CA 94035, UNITED STATES]. Within 30 days of receiving such a request, we will provide a California Privacy Disclosure, which will include a list of certain categories of personal information disclosed during the preceding calendar year to third parties for their direct marketing purposes, along with the names and addresses of the third parties. This request may be made no more than once per calendar year.',
            ],
          },
        ],
      },
    },
  };
};

export default PrivacyPolicy;
