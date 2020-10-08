import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout/layout'

interface Props {
  location: Location
}

const Terms: React.FC<Props> = ({ location }: Props) => {
  // const history = useHistory()

  //   const clickBackHandler = async (e) => {
  //     history.push('/')
  //   }

  return (
    <Layout location={location}>
      <div className="container-xl content privacy">
        <h1 className="title">PRIVACY POLICY</h1>
        <p className="c3">
          <span className="c5 c23">Last Updated: June 30, 2019</span>
        </p>
        <p className="c3 c12">
          <span className="c23 c5"></span>
        </p>
        <p className="c3">
          <span className="c5">This privacy policy (</span>
          <span className="c9">&quot;Policy&quot;</span>
          <span className="c5">) describes how Otonomos&#39;s OtoCo (</span>
          <span className="c9">&quot;OtoCo&quot;</span>
          <span className="c5">, </span>
          <span className="c9">&quot;Company&quot;</span>
          <span className="c5">, </span>
          <span className="c9">&quot;we&quot;</span>
          <span className="c5">, </span>
          <span className="c9">&quot;our&quot;</span>
          <span className="c5">, or </span>
          <span className="c9">&quot;us&quot;</span>
          <span className="c5">
            ) collects, uses, shares, and stores personal information of users
            of this website, Otoco.io (the{' '}
          </span>
          <span className="c9">&quot;Site&quot;</span>
          <span className="c5">
            ). This Policy applies to the Site, applications, products and
            services (collectively,{' '}
          </span>
          <span className="c9">&quot;Services&quot;</span>
          <span className="c1">
            ) on or in which it is posted, linked, or referenced.
          </span>
        </p>
        <p className="c3">
          <span className="c5">
            By using the Services, you accept the terms of this Policy and our{' '}
          </span>
          <span className="c19">
            <Link to="/terms">Terms of Use</Link>
          </span>
          <span className="c5">
            , and consent to our collection, use, disclosure, and retention of
            your information as described in this Policy. If you have not done
            so already, please also review our{' '}
          </span>
          <span className="c19">
            {' '}
            <Link to="/terms">Terms of Use</Link>
          </span>
          <span className="c5">. The </span>
          <span className="c19">
            <Link to="/terms">Terms of Use</Link>
          </span>
          <span className="c1">
            &nbsp;contain provisions that limit our liability to you and require
            you to resolve any dispute with us on an individual basis and not as
            part of any class or representative action. IF YOU DO NOT AGREE WITH
            ANY PART OF THIS PRIVACY POLICY OR OUR TERMS OF USE, THEN PLEASE DO
            NOT USE ANY OF THE SERVICES.
          </span>
        </p>
        <p className="c3">
          <span className="c1">
            Please note that this Policy does not apply to information collected
            through third-party websites or services that you may access through
            the Services or that you submit to us through email, text message or
            other electronic message or offline.
          </span>
        </p>
        <p className="c3">
          <span className="c1">
            If you are visiting this site from the European Union (EU), see our
            Notice to EU Data Subjects below for our legal bases for processing
            and transfer of your data.
          </span>
        </p>
        <p className="c3">
          <span className="c13 c9">WHAT WE COLLECT</span>
        </p>
        <p className="c3">
          <span className="c1">
            We get information about you in a range of ways.
          </span>
        </p>
        <p className="c3">
          <span className="c9">Information You Give Us.</span>
          <span className="c1">
            &nbsp;Information we collect from you includes:
          </span>
        </p>
        <ul className="c17 lst-kix_list_1-0 start">
          <li className="c3 c14">
            <span className="c1">
              Identity information, such as your first name, last name, username
              or similar identifier, title, date of birth and gender;
            </span>
          </li>
          <li className="c3 c14">
            <span className="c1">
              Contact information, such as your postal address, email address
              and telephone number;
            </span>
          </li>
          <li className="c3 c14">
            <span className="c1">
              Profile information, such as your username and password,
              interests, preferences, feedback and survey responses;
            </span>
          </li>
          <li className="c3 c14">
            <span className="c1">
              Feedback and correspondence, such as the information you provide
              in your responses to surveys, when you participate in market
              research activities, report a problem with Service, receive
              customer support or otherwise correspond with us;
            </span>
          </li>
          <li className="c3 c14">
            <span className="c1">
              Usage information, such as information about how you use the
              Service and interact with us;
            </span>
          </li>
          <li className="c3 c14">
            <span className="c1">
              Marketing information, such as your preferences for receiving
              marketing communications and details about how you engage with
              them.
            </span>
          </li>
        </ul>
        <p className="c3">
          <span className="c9">Information We Get From Others.</span>
          <span className="c1">
            &nbsp;We may get information about you from other third-party
            sources and we may add this to information we get from your use of
            the Services. Such information may include:
          </span>
        </p>
        <p className="c3">
          <span className="c9">Information Automatically Collected.</span>
          <span className="c1">
            &nbsp;We may automatically record certain information about how you
            use our Site (we refer to this information as &quot;Log Data&quot;).
            Log Data may include information such as a user&#39;s Internet
            Protocol (IP) address, device and browser type, operating system,
            the pages or features of our Site to which a user browsed and the
            time spent on those pages or features, the frequency with which the
            Site is used by a user, search terms, the links on our Site that a
            user clicked on or used, and other statistics. We use this
            information to administer the Service and we analyze (and may engage
            third parties to analyze) this information to improve and enhance
            the Service by expanding its features and functionality and
            tailoring it to our users&#39; needs and preferences.
          </span>
        </p>
        <p className="c3">
          <span className="c1">
            We may use cookies or similar technologies to analyze trends,
            administer the website, track users&#39; movements around the
            website, and to gather demographic information about our user base
            as a whole. Users can control the use of cookies at the individual
            browser level.
          </span>
        </p>
        <p className="c3">
          <span className="c1">
            We also use Google Analytics to help us offer you an optimized user
            experience.
          </span>
        </p>
        <p className="c3">
          <span className="c5">
            Google Analytics: You can find more information about Google
            Analytics&#39; use of your personal data here:{' '}
          </span>
          <span className="c19">
            <a
              className="c8"
              href="https://www.google.com/analytics/terms/us.html"
            >
              Google Analytics Terms
            </a>
          </span>
        </p>
        <p className="c3">
          <span className="c9">Information We Will Never Collect.</span>
          <span className="c1">
            &nbsp;We will never ask you to share your private keys or wallet
            seed. Never trust anyone or any site that asks you to enter your
            private keys or wallet seed.
          </span>
        </p>
        <p className="c3">
          <span className="c13 c9">USE OF PERSONAL INFORMATION</span>
        </p>
        <p className="c3">
          <span className="c1">To Provide Our Service</span>
        </p>
        <p className="c3">
          <span className="c1">
            We will use your personal information in the following ways:
          </span>
        </p>
        <ul className="c17 lst-kix_list_2-0 start">
          <li className="c3 c14">
            <span className="c1">
              To enable you to access and use the Services.
            </span>
          </li>
          <li className="c3 c14">
            <span className="c1">
              To provide and deliver products and services that you may request.
            </span>
          </li>
          <li className="c3 c14">
            <span className="c1">
              To send information, including confirmations, technical notices,
              updates, security alerts, and support and administrative messages.
            </span>
          </li>
        </ul>
        <p className="c3">
          <span className="c1">To Comply With Law</span>
        </p>
        <p className="c3">
          <span className="c1">
            We use your personal information as we believe necessary or
            appropriate to comply with applicable laws (including anti-money
            laundering (AML) laws and know-your-customer (KYC) requirements),
            lawful requests and legal process, such as to respond to subpoenas
            or requests from government authorities.
          </span>
        </p>
        <p className="c3">
          <span className="c1">To Communicate With You</span>
        </p>
        <p className="c3">
          <span className="c1">
            We use your personal information to communicate about promotions,
            upcoming events, and other news about products and services offered
            by us and our selected partners.
          </span>
        </p>
        <p className="c3">
          <span className="c1">To Optimize Our Platform</span>
        </p>
        <p className="c3">
          <span className="c1">
            In order to optimize your user experience, we may use your personal
            information to operate, maintain, and improve our Services. We may
            also use your information to respond to your comments and questions
            regarding the Services, and to provide you and other users with
            general customer service.
          </span>
        </p>
        <p className="c3">
          <span className="c1">With Your Consent</span>
        </p>
        <p className="c3">
          <span className="c1">
            We may use or share your personal information with your consent,
            such as when you consent to let us post your testimonials or
            endorsements on our Site, you instruct us to take a specific action
            with respect to your personal information, or you opt into third
            party marketing communications.
          </span>
        </p>
        <p className="c3">
          <span className="c1">
            For Compliance, Fraud Prevention, and Safety
          </span>
        </p>
        <p className="c3">
          <span className="c1">
            We may use your personal information to protect, investigate, and
            deter against fraudulent, unauthorized, or illegal activity.
          </span>
        </p>
        <p className="c3">
          <span className="c9 c13">SHARING OF PERSONAL INFORMATION</span>
        </p>
        <p className="c3">
          <span className="c1">
            We do not share or sell the personal information that you provide us
            with other organizations without your express consent, except as
            described in this Privacy Policy. We disclose personal information
            to third parties under the following circumstances:
          </span>
        </p>
        <ul className="c17 lst-kix_list_3-0 start">
          <li className="c3 c14">
            <span className="c9">Affiliates.</span>
            <span className="c1">
              &nbsp;We may disclose your personal information to our
              subsidiaries and corporate affiliates for purposes consistent with
              this Privacy Policy.
            </span>
          </li>
          <li className="c3 c14">
            <span className="c9">Business Transfers.</span>
            <span className="c1">
              &nbsp;We may share personal information when we do a business
              deal, or negotiate a business deal, involving the sale or transfer
              of all or a part of our business or assets. These deals can
              include any merger, financing, acquisition, or bankruptcy
              transaction or proceeding.
            </span>
          </li>
          <li className="c3 c14">
            <span className="c9">
              Compliance with Laws and Law Enforcement; Protection and Safety.
            </span>
            <span className="c1">
              &nbsp;We may share personal information for legal, protection, and
              safety purposes.
            </span>
          </li>
        </ul>
        <ul className="c17 lst-kix_list_3-1 start">
          <li className="c2">
            <span className="c1">
              We may share information to comply with laws, including KYC and
              AML requirements.
            </span>
          </li>
          <li className="c2">
            <span className="c1">
              We may share information to respond to lawful requests and legal
              processes.
            </span>
          </li>
          <li className="c2">
            <span className="c1">
              We may share information to protect the rights and property of the
              Company, our agents, customers, and others. This includes
              enforcing our agreements, policies, and terms of use.
            </span>
          </li>
          <li className="c2">
            <span className="c1">
              We may share information in an emergency. This includes protecting
              the safety of our employees and agents, our customers, or any
              person.
            </span>
          </li>
        </ul>
        <ul className="c17 lst-kix_list_3-0">
          <li className="c3 c14">
            <span className="c9">
              Professional Advisors and Service Providers.
            </span>
            <span className="c1">
              &nbsp;We may share information with those who need it to do work
              for us. These recipients may include third party companies and
              individuals to administer and provide the Service on our behalf
              (such as customer support, hosting, email delivery and database
              management services), as well as lawyers, bankers, auditors, and
              insurers.
            </span>
          </li>
          <li className="c3 c14">
            <span className="c9">Other.</span>
            <span className="c1">
              &nbsp;You may permit us to share your personal information with
              other companies or entities of your choosing. Those uses will be
              subject to the privacy policies of the recipient entity or
              entities.
            </span>
          </li>
        </ul>
        <p className="c3">
          <span className="c1">
            We may also share aggregated and/or anonymized data with others for
            their own uses.
          </span>
        </p>
        <p className="c3">
          <span className="c13 c9">INTERNATIONAL TRANSFER</span>
        </p>
        <p className="c3">
          <span className="c1">
            The Company has offices outside of the EU and has affiliates and
            service providers in the United States and in other countries. Your
            personal information may be transferred to or from the United States
            or other locations outside of your state, province, country or other
            governmental jurisdiction where privacy laws may not be as
            protective as those in your jurisdiction.
          </span>
        </p>
        <p className="c3">
          <span className="c1">
            EU users should read the important information provided below about
            transfer of personal information outside of the European Economic
            Area (EEA).
          </span>
        </p>
        <p className="c3">
          <span className="c13 c9">HOW INFORMATION IS SECURED</span>
        </p>
        <p className="c3">
          <span className="c5">
            We retain information we collect as long as it is necessary and
            relevant to fulfill the purposes outlined in this privacy policy. In
            addition, we retain personal information to comply with applicable
            law where required, prevent fraud, resolve disputes, troubleshoot
            problems, assist with any investigation, enforce our{' '}
          </span>
          <span className="c19">
            <Link to="terms">Terms of Use</Link>
          </span>
          <span className="c1">
            , and other actions permitted by law. To determine the appropriate
            retention period for personal information, we consider the amount,
            nature, and sensitivity of the personal information, the potential
            risk of harm from unauthorized use or disclosure of your personal
            information, the purposes for which we process your personal
            information and whether we can achieve those purposes through other
            means, and the applicable legal requirements.
          </span>
        </p>
        <p className="c3">
          <span className="c1">
            In some circumstances we may anonymize your personal information (so
            that it can no longer be associated with you) in which case we may
            use this information indefinitely without further notice to you.
          </span>
        </p>
        <p className="c3">
          <span className="c1">
            We employ industry standard security measures designed to protect
            the security of all information submitted through the Services.
            However, the security of information transmitted through the
            internet can never be guaranteed. We are not responsible for any
            interception or interruption of any communications through the
            internet or for changes to or losses of data. Users of the Services
            are responsible for maintaining the security of any password,
            biometrics, user ID or other form of authentication involved in
            obtaining access to password protected or secure areas of any of our
            digital services. In order to protect you and your data, we may
            suspend your use of any of the Services, without notice, pending an
            investigation, if any breach of security is suspected.
          </span>
        </p>
        <p className="c3">
          <span className="c13 c9">INFORMATION CHOICES AND CHANGES</span>
        </p>
        <p className="c3">
          <span className="c1">
            Accessing, Updating, Correcting, and Deleting your Information
          </span>
        </p>
        <p className="c3">
          <span className="c5">
            You may access information that you have voluntarily provided
            through your account on the Services, and to review, correct, or
            delete it by sending a request to{' '}
          </span>
          <span className="c5 c21">
            <a className="c8" href="mailto:legal@otonomos.com">
              legal@otonomos.com
            </a>
          </span>
          <span className="c1">
            . You can request to change contact choices, opt-out of our sharing
            with others, and update your personal information and preferences.
          </span>
        </p>
        <p className="c3">
          <span className="c1">Tracking Technologies Generally</span>
        </p>
        <p className="c3">
          <span className="c1">
            Regular cookies may generally be disabled or removed by tools
            available as part of most commercial browsers, and in some instances
            blocked in the future by selecting certain settings. For more
            information, please see the section entitled &quot;Cookies
            Policy&quot; below.
          </span>
        </p>
        <p className="c3">
          <span className="c1">Google Analytics</span>
        </p>
        <p className="c3">
          <span className="c5">
            You may exercise choices regarding the use of cookies from Google
            Analytics by going to{' '}
          </span>
          <span className="c19">
            <a className="c8" href="https://tools.google.com/dlpage/gaoptout">
              Google Analytics Opt-out
            </a>
          </span>
          <span className="c1">
            &nbsp;and downloading the Google Analytics Opt-out Browser Add-on.
          </span>
        </p>
        <p className="c3">
          <span className="c13 c9">CONTACT INFORMATION</span>
        </p>
        <p className="c3">
          <span className="c5">
            We welcome your comments or questions about this Policy, and you may
            contact us at:{' '}
          </span>
          <span className="c19">
            <a className="c8" href="mailto:legal@otonomos.com">
              legal@otonomos.com
            </a>
          </span>
          <span className="c1">.</span>
        </p>
        <p className="c3">
          <span className="c13 c9">CHANGES TO THIS PRIVACY POLICY</span>
        </p>
        <p className="c3">
          <span className="c5">
            We may change this Privacy Policy at any time. We encourage you to
            periodically review this page for the latest information on our
            privacy practices. If we make any changes, we will change the{' '}
          </span>
          <span className="c9">Last Updated</span>
          <span className="c1">&nbsp;date above.</span>
        </p>
        <p className="c3">
          <span className="c1">
            Any modifications to this Privacy Policy will be effective upon our
            posting of the new terms and/or upon implementation of the changes
            to the Site (or as otherwise indicated at the time of posting). In
            all cases, your continued use of the the Site or Services after the
            posting of any modified Privacy Policy indicates your acceptance of
            the terms of the modified Privacy Policy.
          </span>
        </p>
        <p className="c3">
          <span className="c13 c9">ELIGIBILITY</span>
        </p>
        <p className="c3">
          <span className="c1">
            If you are under the age of majority in your jurisdiction of
            residence, you may use the Services only with the consent of or
            under the supervision of your parent or legal guardian. Consistent
            with the requirements of the Children&#39;s Online Privacy
            Protection Act (COPPA), if we learn that we have received any
            information directly from a child under age 13 without first
            receiving his or her parent&#39;s verified consent, we will use that
            information only to respond directly to that child (or his or her
            parent or legal guardian) to inform the child that he or she cannot
            use the Site and subsequently we will delete that information.
          </span>
        </p>
        <p className="c3">
          <span className="c13 c9">ATTORNEY COMMUNICATION</span>
        </p>
        <p className="c3">
          <span className="c5">
            If you choose to communicate with an attorney through our Services,
            please note that any such communications between you and such
            attorney may not necessarily be treated as confidential information
            by the attorney or protected by the attorney-client privilege
            doctrine. For additional information, please read the
            &quot;Overview&quot; section in our{' '}
          </span>
          <span className="c19">
            <Link to="/terms">Terms of Use</Link>
          </span>
          <span className="c1">.</span>
        </p>
        <p className="c3">
          <span className="c13 c9">NOTICE TO CALIFORNIA RESIDENTS</span>
        </p>
        <p className="c3">
          <span className="c1">
            Under California Civil Code Section 1789.3, California users are
            entitled to the following consumer rights notice: California
            residents may reach the Complaint Assistance Unit of the Division of
            Consumer Services of the California Department of Consumer Affairs
            by mail at 1625 North Market Blvd., Sacramento, CA 95834, or by
            telephone at (916) 445-1254 or (800) 952-5210.
          </span>
        </p>
        <p className="c3">
          <span className="c1">
            This section provides additional details about the personal
            information we collect about California consumers and the rights
            afforded to them under the California Consumer Privacy Act or
            &quot;CCPA.&quot;
          </span>
        </p>
        <p className="c3">
          <span className="c1">
            For more details about the personal information we collect from you,
            please see the &quot;What We Collect&quot; section above. We collect
            this information for the business and commercial purposes described
            in the &quot;Use of Personal Information&quot; section above. We
            share this information with the categories of third parties
            described in the &quot;Sharing of Personal Information&quot; section
            above. Company does not sell (as such term is defined in the CCPA)
            the personal information we collect (and will not sell it without
            providing a right to opt out). Please refer to our Cookie Policy
            below for more information regarding the types of third-party
            cookies, if any, that we use.
          </span>
        </p>
        <p className="c3">
          <span className="c1">
            Subject to certain limitations, the CCPA provides California
            consumers the right to request to know more details about the
            categories or specific pieces of personal information we collect
            (including how we use and disclose this information), to delete
            their personal information, to opt out of any &quot;sales&quot; that
            may be occurring, and to not be discriminated against for exercising
            these rights.
          </span>
        </p>
        <p className="c3">
          <span className="c5">
            California consumers may make a request pursuant to their rights
            under the CCPA by contacting us at{' '}
          </span>
          <span className="c19">
            <a className="c8" href="mailto:legal@otonomos.com">
              legal@otonomos.com
            </a>
          </span>
          <span className="c1">
            . Please note that you must verify your identity and request before
            further action is taken. As a part of this process, government
            identification may be required. Consistent with California law, you
            may designate an authorized agent to make a request on your behalf.
            In order to designate an authorized agent to make a request on your
            behalf, you must provide a valid power of attorney, the
            requester&#39;s valid government issued identification, and the
            authorized agent&#39;s valid government issued identification.
          </span>
        </p>
        <p className="c3">
          <span className="c13 c9">NOTICE TO EU DATA SUBJECTS</span>
        </p>
        <p className="c3">
          <span className="c1">Personal Information</span>
        </p>
        <p className="c3">
          <span className="c5">
            With respect to EU data subjects, &quot;personal information,&quot;
            as used in this Privacy Policy, is equivalent to &quot;personal
            data&quot; as defined in the{' '}
          </span>
          <span className="c19">
            <a className="c8" href="https://gdpr-info.eu/art-4-gdpr/">
              European Union General Data Protection Regulation
            </a>
          </span>
          <span className="c1">&nbsp;(GDPR).</span>
        </p>
        <p className="c3">
          <span className="c1">Sensitive Data</span>
        </p>
        <p className="c3">
          <span className="c1">
            Some of the information you provide us may constitute sensitive data
            as defined in the GDPR (also referred to as special categories of
            personal data), including identification of your race or ethnicity
            on government-issued identification documents.
          </span>
        </p>
        <p className="c3">
          <span className="c1">Legal Bases for Processing</span>
        </p>
        <p className="c3">
          <span className="c5">
            We only use your personal information as permitted by law. We are
            required to inform you of the legal bases of our processing of your
            personal information, which are described in the table below. If you
            have questions about the legal bases under which we process your
            personal information, contact us at{' '}
          </span>
          <span className="c19">
            <a className="c8" href="mailto:legal@otonomos.com">
              legal@otonomos.com
            </a>
          </span>
          <span className="c1">.</span>
        </p>
        <a id="t.0"></a>
        <table className="table table-sm table-hover table-responsive">
          <tbody>
            <tr className="c7">
              <td className="c15">
                <p className="c0">
                  <span className="c6">Processing Purpose</span>
                </p>
              </td>
              <td className="c15">
                <p className="c0">
                  <span className="c6">Legal Basis</span>
                </p>
              </td>
            </tr>
            <tr className="c7">
              <td className="c10 c16">
                <p className="c0">
                  <span className="c4">To provide our service</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">
                    Our processing of your personal information is necessary to
                    perform the contract governing our provision of the Services
                    or to take steps that you request prior to signing up for
                    the Service.
                  </span>
                </p>
              </td>
            </tr>
            <tr className="c7">
              <td className="c10 c25">
                <p className="c0">
                  <span className="c4">To communicate with you </span>
                </p>
                <p className="c0 c12">
                  <span className="c4"></span>
                </p>
                <p className="c0">
                  <span className="c4">To optimize our platform </span>
                </p>
                <p className="c0 c12">
                  <span className="c4"></span>
                </p>
                <p className="c0">
                  <span className="c4">
                    For compliance, fraud prevention, and safety{' '}
                  </span>
                </p>
                <p className="c0 c12">
                  <span className="c4"></span>
                </p>
                <p className="c0">
                  <span className="c4">To provide our service</span>
                </p>
              </td>
              <td className="c11">
                <p className="c0">
                  <span className="c4">
                    These processing activities constitute our legitimate
                    interests. We make sure we consider and balance any
                    potential impacts on you (both positive and negative) and
                    your rights before we process your personal information for
                    our legitimate interests. We do not use your personal
                    information for activities where our interests are
                    overridden by any adverse impact on you (unless we have your
                    consent or are otherwise required or permitted to by law).
                  </span>
                </p>
              </td>
            </tr>
            <tr className="c7">
              <td className="c10 c16">
                <p className="c0">
                  <span className="c4">To comply with law</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">
                    We use your personal information to comply with applicable
                    laws and our legal obligations, including anti-money
                    laundering (AML) laws and know-your-customer (KYC)
                    requirements.
                  </span>
                </p>
              </td>
            </tr>
            <tr className="c7">
              <td className="c10 c25">
                <p className="c0">
                  <span className="c4">With your consent</span>
                </p>
              </td>
              <td className="c11">
                <p className="c0">
                  <span className="c5 c26">
                    Where our use of your personal information is based upon
                    your consent, you have the right to withdraw it anytime in
                    the manner indicated in the Service or by contacting us at{' '}
                  </span>
                  <span className="c19 c26">
                    <a className="c8" href="mailto:legal@otonomos.com">
                      legal@otonomos.com
                    </a>
                  </span>
                  <span className="c4">&nbsp;.</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="c3">
          <span className="c1">Use for New Purposes</span>
        </p>
        <p className="c3">
          <span className="c1">
            We may use your personal information for reasons not described in
            this Privacy Policy, where we are permitted by law to do so and
            where the reason is compatible with the purpose for which we
            collected it. If we need to use your personal information for an
            unrelated purpose, we will notify you and explain the applicable
            legal basis for that use. If we have relied upon your consent for a
            particular use of your personal information, we will seek your
            consent for any unrelated purpose.
          </span>
        </p>
        <p className="c3">
          <span className="c1">Your Rights</span>
        </p>
        <p className="c3">
          <span className="c1">
            Under the GDPR, you have certain rights regarding your personal
            information. You may ask us to take the following actions in
            relation to your personal information that we hold:
          </span>
        </p>
        <ul className="c17 lst-kix_list_4-0 start">
          <li className="c3 c14">
            <span className="c9">Opt-out.</span>
            <span className="c1">
              &nbsp;Stop sending you direct marketing communications which you
              have previously consented to receive. We may continue to send you
              Service-related and other non-marketing communications.
            </span>
          </li>
          <li className="c3 c14">
            <span className="c9">Access.</span>
            <span className="c1">
              &nbsp;Provide you with information about our processing of your
              personal information and give you access to your personal
              information.
            </span>
          </li>
          <li className="c3 c14">
            <span className="c9">Correct.</span>
            <span className="c1">
              &nbsp;Update or correct inaccuracies in your personal information.
            </span>
          </li>
          <li className="c3 c14">
            <span className="c9">Delete.</span>
            <span className="c1">&nbsp;Delete your personal information.</span>
          </li>
          <li className="c3 c14">
            <span className="c9">Transfer.</span>
            <span className="c1">
              &nbsp;Transfer a machine-readable copy of your personal
              information to you or a third party of your choice.
            </span>
          </li>
          <li className="c3 c14">
            <span className="c9">Restrict.</span>
            <span className="c1">
              &nbsp;Restrict the processing of your personal information.
            </span>
          </li>
          <li className="c3 c14">
            <span className="c9">Object.</span>
            <span className="c1">
              &nbsp;Object to our reliance on our legitimate interests as the
              basis of our processing of your personal information that impacts
              your rights.
            </span>
          </li>
        </ul>
        <p className="c3">
          <span className="c5">You can submit these requests by email to </span>
          <span className="c19">
            <a className="c8" href="mailto:legal@otonomos.com">
              legal@otonomos.com
            </a>
          </span>
          <span className="c5">
            . We may request specific information from you to help us confirm
            your identity and process your request. Applicable law may require
            or permit us to decline your request. If we decline your request, we
            will tell you why, subject to legal restrictions. If you would like
            to submit a complaint about our use of your personal information or
            response to your requests regarding your personal information, you
            may contact us at{' '}
          </span>
          <span className="c19">
            <a className="c8" href="mailto:legal@otonomos.com">
              legal@otonomos.com
            </a>
          </span>
          <span className="c5">
            &nbsp;or submit a complaint to the data protection regulator in your
            jurisdiction. You can find your data protection regulator{' '}
          </span>
          <span className="c19">
            <a
              className="c8"
              href="https://ec.europa.eu/justice/article-29/structure/data-protection-authorities/index_en.htm"
            >
              here
            </a>
          </span>
          <span className="c1">.</span>
        </p>
        <p className="c3">
          <span className="c1">Cross-Border Data Transfer</span>
        </p>
        <p className="c3">
          <span className="c1">
            Please be aware that your personal data will be transferred to,
            processed, and stored in the United States. Data protection laws in
            the U.S. may be different from those in your country of residence.
            You consent to the transfer of your information, including personal
            information, to the U.S. as set forth in this Privacy Policy by
            visiting our site or using our service.
          </span>
        </p>
        <p className="c3">
          <span className="c1">
            Whenever we transfer your personal information out of the EEA to the
            U.S. or countries not deemed by the European Commission to provide
            an adequate level of personal information protection, the transfer
            will be based on a data transfer mechanism recognized by the
            European Commission as providing adequate protection for personal
            information.
          </span>
        </p>
        <p className="c3">
          <span className="c1">
            Please contact us if you want further information on the specific
            mechanism used by us when transferring your personal information out
            of the EEA.
          </span>
        </p>
        <p className="c3">
          <span className="c13 c9">COOKIES POLICY</span>
        </p>
        <p className="c3">
          <span className="c1">
            We understand that your privacy is important to you and are
            committed to being transparent about the technologies we use. In the
            spirit of transparency, this policy provides detailed information
            about how and when we use cookies on our Site.
          </span>
        </p>
        <p className="c3">
          <span className="c1">Do we use Cookies?</span>
        </p>
        <p className="c3">
          <span className="c1">
            Yes. We and our marketing partners, affiliates, and analytics or
            service providers use cookies, web beacons, or pixels and other
            technologies to ensure everyone who uses the Site has the best
            possible experience.
          </span>
        </p>
        <p className="c3">
          <span className="c1">What is a Cookie?</span>
        </p>
        <p className="c3">
          <span className="c1">
            A cookie (&quot;Cookie&quot;) is a small text file that is placed on
            your hard drive by a web page server. Cookies contain information
            that can later be read by a web server in the domain that issued the
            cookie to you. Some of the cookies will only be used if you use
            certain features or select certain preferences, and some cookies
            will always be used. You can find out more about each cookie by
            viewing our current cookie list below. We update this list
            periodically, so there may be additional cookies that are not yet
            listed. Web beacons, tags and scripts may be used in the Site or in
            emails to help us to deliver cookies, count visits, understand usage
            and campaign effectiveness and determine whether an email has been
            opened and acted upon. We may receive reports based on the use of
            these technologies by our service/analytics providers on an
            individual and aggregated basis.
          </span>
        </p>
        <p className="c3">
          <span className="c1">Why do we use Cookies?</span>
        </p>
        <p className="c3">
          <span className="c1">
            We generally use Cookies for the following purposes:
          </span>
        </p>
        <ul className="c17 lst-kix_list_5-0 start">
          <li className="c3 c14">
            <span className="c1">To recognize new or past customers.</span>
          </li>
          <li className="c3 c14">
            <span className="c1">
              To store your password if you are registered on our Site.
            </span>
          </li>
          <li className="c3 c14">
            <span className="c1">
              To improve our Site and to better understand your visits on our
              platforms and Site.
            </span>
          </li>
          <li className="c3 c14">
            <span className="c1">
              To serve you with interest-based or targeted advertising.
            </span>
          </li>
          <li className="c3 c14">
            <span className="c1">
              To observe your behaviors and browsing activities over time across
              multiple websites or other platforms.
            </span>
          </li>
          <li className="c3 c14">
            <span className="c1">
              To better understand the interests of our customers and our
              website visitors.
            </span>
          </li>
        </ul>
        <p className="c3">
          <span className="c1">
            Some Cookies are necessary for certain uses of the Site, and without
            such Cookies, we would not be able to provide many services that you
            need to properly use the Site. These Cookies, for example, allow us
            to operate our Site so you may access it as you have requested and
            let us recognize that you have created an account and have logged
            into that account to access Site content. They also include Cookies
            that enable us to remember your previous actions within the same
            browsing session and secure our Sites.
          </span>
        </p>
        <p className="c3">
          <span className="c1">
            We also use functional Cookies and Cookies from third parties for
            analysis and marketing purposes. Functional Cookies enable certain
            parts of the site to work properly and your user preferences to
            remain known. Analysis Cookies, among other things, collect
            information on how visitors use our Site, the content and products
            that users view most frequently, and the effectiveness of our
            third-party advertising. Advertising Cookies assist in delivering
            ads to relevant audiences and having our ads appear at the top of
            search results. Cookies are either &quot;session&quot; Cookies which
            are deleted when you end your browser session, or
            &quot;persistent,&quot; which remain until their deletion by you
            (discussed below) or the party who served the cookie. Full details
            on all of the Cookies used on the Site are available at our Cookie
            Disclosure table below.
          </span>
        </p>
        <p className="c3">
          <span className="c1">How to disable Cookies</span>
        </p>
        <p className="c3">
          <span className="c1">
            You can generally activate or later deactivate the use of cookies
            through a functionality built into your web browser. To learn more
            about how to control cookie settings through your browser:
          </span>
        </p>
        <p className="c3">
          <span className="c5">Click </span>
          <span className="c19">
            <a
              className="c8"
              href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
            >
              here
            </a>
          </span>
          <span className="c1">
            &nbsp;to learn more about the &quot;Private Browsing&quot; setting
            and managing cookie settings in Firefox;
          </span>
        </p>
        <p className="c3">
          <span className="c5">Click </span>
          <span className="c19">
            <a
              className="c8"
              href="https://support.google.com/chrome/answer/95647"
            >
              here
            </a>
          </span>
          <span className="c1">
            &nbsp;to learn more about &quot;Incognito&quot; and managing cookie
            settings in Chrome;
          </span>
        </p>
        <p className="c3">
          <span className="c5">Click </span>
          <span className="c19">
            <a
              className="c8"
              href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies"
            >
              here
            </a>
          </span>
          <span className="c1">
            &nbsp;to learn more about &quot;InPrivate&quot; and managing cookie
            settings in Internet Explorer; or
          </span>
        </p>
        <p className="c3">
          <span className="c5">Click </span>
          <span className="c19">
            <a
              className="c8"
              href="https://support.apple.com/guide/safari/browse-in-private-ibrw1069/mac"
            >
              here
            </a>
          </span>
          <span className="c1">
            &nbsp;to learn more about &quot;Private Browsing&quot; and managing
            cookie settings in Safari.
          </span>
        </p>
        <p className="c3">
          <span className="c5">
            If you want to learn more about cookies, or how to control, disable
            or delete them, please visit{' '}
          </span>
          <span className="c19">
            <a className="c8" href="http://www.aboutcookies.org/">
              http://www.aboutcookies.org
            </a>
          </span>
          <span className="c5">
            &nbsp;for detailed guidance. In addition, certain third party
            advertising networks, including Google, permit users to opt out of
            or customize preferences associated with your internet browsing. To
            learn more about this feature from Google, click{' '}
          </span>
          <span className="c19">
            <a className="c8" href="https://adssettings.google.com/u/0/">
              here
            </a>
          </span>
          <span className="c1">.</span>
        </p>
        <p className="c3">
          <span className="c5">
            To control flash cookies, which we may use on our Site from time to
            time, you can go to this{' '}
          </span>
          <span className="c19">
            <a
              className="c8"
              href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html"
            >
              link
            </a>
          </span>
          <span className="c1">
            &nbsp;because Flash cookies cannot be controlled through your
            browser settings. Please note that if you decline the use of
            Cookies, some functions of the website may be unavailable and we
            will not be able to present personally tailored content and
            advertisements to you.
          </span>
        </p>
        <p className="c0">
          <span className="c1">
            We may link the information collected by Cookies with other
            information we collect from you pursuant to this Privacy Policy and
            use the combined information as set forth herein. Similarly, the
            third parties who serve cookies on our Site may link your name or
            email address to other information they collect, which may include
            past purchases made offline or online, or your online usage
            information. If you are located in the European Economic Area, you
            have certain rights that are described above under the header
            &quot;Notice to EU Data Subjects&quot;, including the right to
            inspect and correct or delete the data that we have about you.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Cookies Disclosure</span>
        </p>
        <a></a>
        <a id="t.1"></a>
        <table className="table table-sm table-responsive">
          <thead>
            <th>Name of Cookie/Identifier</th>
            <th>
              What does the cookie generally do (e.g., website function and
              administration, analytics, marketing)?
            </th>
            <th>
              Is it a 1st or 3rd party cookie and what is the name of the party
              providing it?
            </th>
            <th>What type of cookie is it (persistent or session)?</th>
            <th>
              What is the duration of the cookie on the website (if not cleared
              by the user)?
            </th>
          </thead>
          <tbody>
            <tr className="c7">
              <td className="c10 c16">
                <p className="c0">
                  <span className="c4">Google Analytics</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">Analytics</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">3rd - Google</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">Persistent</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">2 years</span>
                </p>
              </td>
            </tr>
            <tr className="c7">
              <td className="c10 c25">
                <p className="c0">
                  <span className="c4">Dashboard welcome cookie</span>
                </p>
              </td>
              <td className="c11">
                <p className="c0">
                  <span className="c4">Website function</span>
                </p>
              </td>
              <td className="c11">
                <p className="c0">
                  <span className="c4">1st - OtoCo</span>
                </p>
              </td>
              <td className="c11">
                <p className="c0">
                  <span className="c4">Persistent</span>
                </p>
              </td>
              <td className="c11">
                <p className="c0">
                  <span className="c4">1 year</span>
                </p>
              </td>
            </tr>
            <tr className="c7">
              <td className="c10 c16">
                <p className="c0">
                  <span className="c4">_ ga</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">Used to distinguish users</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">3rd - Google</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">Persistent</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">2 years</span>
                </p>
              </td>
            </tr>
            <tr className="c7">
              <td className="c10 c25">
                <p className="c0">
                  <span className="c4">_ gid</span>
                </p>
              </td>
              <td className="c11">
                <p className="c0">
                  <span className="c4">Used to distinguish users</span>
                </p>
              </td>
              <td className="c11">
                <p className="c0">
                  <span className="c4">3rd - Google</span>
                </p>
              </td>
              <td className="c11">
                <p className="c0">
                  <span className="c4">Persistent</span>
                </p>
              </td>
              <td className="c11">
                <p className="c0">
                  <span className="c4">2 years</span>
                </p>
              </td>
            </tr>
            <tr className="c7">
              <td className="c10 c16">
                <p className="c0">
                  <span className="c4">gat gtag_</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">Used to throttle request rate</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">3rd - Google</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">Persistent</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">1 minute</span>
                </p>
              </td>
            </tr>
            <tr className="c7">
              <td className="c10 c25">
                <p className="c0">
                  <span className="c4">_ _ cfduid</span>
                </p>
              </td>
              <td className="c11">
                <p className="c0">
                  <span className="c4">Used to distinguish users</span>
                </p>
              </td>
              <td className="c11">
                <p className="c0">
                  <span className="c4">3rd - Cloudflare</span>
                </p>
              </td>
              <td className="c11">
                <p className="c0">
                  <span className="c4">Persistent</span>
                </p>
              </td>
              <td className="c11">
                <p className="c0">
                  <span className="c4">1 year</span>
                </p>
              </td>
            </tr>
            <tr className="c7">
              <td className="c10 c16">
                <p className="c0">
                  <span className="c4">PLAY_SESSION</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">Used to distinguish users</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">1st - OtoCo</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">Session</span>
                </p>
              </td>
              <td className="c15 c16">
                <p className="c0">
                  <span className="c4">Session</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default Terms
