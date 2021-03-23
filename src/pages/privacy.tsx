import React from 'react'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import loadable from '@loadable/component'
const Layout = loadable(() => import('../components/layout/layout'))
// import Layout from '../components/layout/layout'

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
      <Helmet title="Otoco - Privacy Policy" defer={false} />
      <div className="container-sm limiter-md large-amount-of-text">
        <h1>Privacy Policy</h1>
        <p className="text-muted">Last Updated: June 30, 2019</p>
        <p>
          This privacy policy (&quot;Policy&quot;) describes how Otonomos&#39;s
          OtoCo (&quot;OtoCo&quot; , &quot;Company&quot; , &quot;we&quot; ,
          &quot;our&quot; , or &quot;us&quot;) collects, uses, shares, and
          stores personal information of users of this website, Otoco.io (the
          &quot;Site&quot;). This Policy applies to the Site, applications,
          products and services (collectively, &quot;Services&quot;) on or in
          which it is posted, linked, or referenced.
        </p>
        <p>
          By using the Services, you accept the terms of this Policy and
          our&nbsp;
          <Link to="/terms">Terms of Use</Link>, and consent to our collection,
          use, disclosure, and retention of your information as described in
          this Policy. If you have not done so already, please also review
          our&nbsp;
          <Link to="/terms">Terms of Use</Link>. The&nbsp;
          <Link to="/terms">Terms of Use</Link>
          &nbsp;contain provisions that limit our liability to you and require
          you to resolve any dispute with us on an individual basis and not as
          part of any class or representative action. IF YOU DO NOT AGREE WITH
          ANY PART OF THIS PRIVACY POLICY OR OUR TERMS OF USE, THEN PLEASE DO
          NOT USE ANY OF THE SERVICES.
        </p>
        <p>
          Please note that this Policy does not apply to information collected
          through third-party websites or services that you may access through
          the Services or that you submit to us through email, text message or
          other electronic message or offline.
        </p>
        <p>
          If you are visiting this site from the European Union (EU), see our
          Notice to EU Data Subjects below for our legal bases for processing
          and transfer of your data.
        </p>
        <h2>What We Collect</h2>
        <p>We get information about you in a range of ways.</p>
        <h3>Information You Give Us</h3>
        <p>Information we collect from you includes:</p>
        <p>
          <ul>
            <li>
              Identity information, such as your first name, last name, username
              or similar identifier, title, date of birth and gender;
            </li>
            <li>
              Contact information, such as your postal address, email address
              and telephone number;
            </li>
            <li>
              Profile information, such as your username and password,
              interests, preferences, feedback and survey responses;
            </li>
            <li>
              Feedback and correspondence, such as the information you provide
              in your responses to surveys, when you participate in market
              research activities, report a problem with Service, receive
              customer support or otherwise correspond with us;
            </li>
            <li>
              Usage information, such as information about how you use the
              Service and interact with us;
            </li>
            <li>
              Marketing information, such as your preferences for receiving
              marketing communications and details about how you engage with
              them.
            </li>
          </ul>
        </p>
        <p>
          Information We Get From Others. &nbsp;We may get information about you
          from other third-party sources and we may add this to information we
          get from your use of the Services. Such information may include:
        </p>
        <p>
          Information Automatically Collected. &nbsp;We may automatically record
          certain information about how you use our Site (we refer to this
          information as &quot;Log Data&quot;). Log Data may include information
          such as a user&#39;s Internet Protocol (IP) address, device and
          browser type, operating system, the pages or features of our Site to
          which a user browsed and the time spent on those pages or features,
          the frequency with which the Site is used by a user, search terms, the
          links on our Site that a user clicked on or used, and other
          statistics. We use this information to administer the Service and we
          analyze (and may engage third parties to analyze) this information to
          improve and enhance the Service by expanding its features and
          functionality and tailoring it to our users&#39; needs and
          preferences.
        </p>
        <p>
          We may use cookies or similar technologies to analyze trends,
          administer the website, track users&#39; movements around the website,
          and to gather demographic information about our user base as a whole.
          Users can control the use of cookies at the individual browser level.
        </p>
        <p>
          We also use Google Analytics to help us offer you an optimized user
          experience.
        </p>
        <p>
          Google Analytics: You can find more information about Google
          Analytics&#39; use of your personal data here:&nbsp;
          <a href="https://www.google.com/analytics/terms/us.html">
            Google Analytics Terms
          </a>
        </p>
        <h3>Information We Will Never Collect</h3>
        <p>
          We will never ask you to share your private keys or wallet seed. Never
          trust anyone or any site that asks you to enter your private keys or
          wallet seed.
        </p>
        <h2>Use of Personal Information</h2>
        <h3>To Provide Our Service</h3>
        <p>We will use your personal information in the following ways:</p>
        <p>
          <ul>
            <li>To enable you to access and use the Services.</li>
            <li>
              To provide and deliver products and services that you may request.
            </li>
            <li>
              To send information, including confirmations, technical notices,
              updates, security alerts, and support and administrative messages.
            </li>
          </ul>
        </p>
        <h3>To Comply With Law</h3>
        <p>
          We use your personal information as we believe necessary or
          appropriate to comply with applicable laws (including anti-money
          laundering (AML) laws and know-your-customer (KYC) requirements),
          lawful requests and legal process, such as to respond to subpoenas or
          requests from government authorities.
        </p>
        <h3>To Communicate With You</h3>
        <p>
          We use your personal information to communicate about promotions,
          upcoming events, and other news about products and services offered by
          us and our selected partners.
        </p>
        <h3>To Optimize Our Platform</h3>
        <p>
          In order to optimize your user experience, we may use your personal
          information to operate, maintain, and improve our Services. We may
          also use your information to respond to your comments and questions
          regarding the Services, and to provide you and other users with
          general customer service.
        </p>
        <h3>With Your Consent</h3>
        <p>
          We may use or share your personal information with your consent, such
          as when you consent to let us post your testimonials or endorsements
          on our Site, you instruct us to take a specific action with respect to
          your personal information, or you opt into third party marketing
          communications.
        </p>
        <h3>For Compliance, Fraud Prevention, and Safety</h3>
        <p>
          We may use your personal information to protect, investigate, and
          deter against fraudulent, unauthorized, or illegal activity.
        </p>
        <h2>Sharing of Personal Information</h2>
        <p>
          We do not share or sell the personal information that you provide us
          with other organizations without your express consent, except as
          described in this Privacy Policy. We disclose personal information to
          third parties under the following circumstances:
        </p>
        <p>
          <ul>
            <li>
              Affiliates. &nbsp;We may disclose your personal information to our
              subsidiaries and corporate affiliates for purposes consistent with
              this Privacy Policy.
            </li>
            <li>
              Business Transfers. &nbsp;We may share personal information when
              we do a business deal, or negotiate a business deal, involving the
              sale or transfer of all or a part of our business or assets. These
              deals can include any merger, financing, acquisition, or
              bankruptcy transaction or proceeding.
            </li>
            <li>
              Compliance with Laws and Law Enforcement; Protection and Safety.
              &nbsp;We may share personal information for legal, protection, and
              safety purposes.
            </li>
          </ul>
        </p>
        <p>
          <ul>
            <li>
              We may share information to comply with laws, including KYC and
              AML requirements.
            </li>
            <li>
              We may share information to respond to lawful requests and legal
              processes.
            </li>
            <li>
              We may share information to protect the rights and property of the
              Company, our agents, customers, and others. This includes
              enforcing our agreements, policies, and terms of use.
            </li>
            <li>
              We may share information in an emergency. This includes protecting
              the safety of our employees and agents, our customers, or any
              person.
            </li>
          </ul>
        </p>
        <p>
          <ul>
            <li>
              Professional Advisors and Service Providers. &nbsp;We may share
              information with those who need it to do work for us. These
              recipients may include third party companies and individuals to
              administer and provide the Service on our behalf (such as customer
              support, hosting, email delivery and database management
              services), as well as lawyers, bankers, auditors, and insurers.
            </li>
            <li>
              Other. &nbsp;You may permit us to share your personal information
              with other companies or entities of your choosing. Those uses will
              be subject to the privacy policies of the recipient entity or
              entities.
            </li>
          </ul>
        </p>
        <p>
          We may also share aggregated and/or anonymized data with others for
          their own uses.
        </p>
        <h2>International Transfer</h2>
        <p>
          The Company has offices outside of the EU and has affiliates and
          service providers in the United States and in other countries. Your
          personal information may be transferred to or from the United States
          or other locations outside of your state, province, country or other
          governmental jurisdiction where privacy laws may not be as protective
          as those in your jurisdiction.
        </p>
        <p>
          EU users should read the important information provided below about
          transfer of personal information outside of the European Economic Area
          (EEA).
        </p>
        <h2>How Information is Secured</h2>
        <p>
          We retain information we collect as long as it is necessary and
          relevant to fulfill the purposes outlined in this privacy policy. In
          addition, we retain personal information to comply with applicable law
          where required, prevent fraud, resolve disputes, troubleshoot
          problems, assist with any investigation, enforce our&nbsp;
          <Link to="terms">Terms of Use</Link>, and other actions permitted by
          law. To determine the appropriate retention period for personal
          information, we consider the amount, nature, and sensitivity of the
          personal information, the potential risk of harm from unauthorized use
          or disclosure of your personal information, the purposes for which we
          process your personal information and whether we can achieve those
          purposes through other means, and the applicable legal requirements.
        </p>
        <p>
          In some circumstances we may anonymize your personal information (so
          that it can no longer be associated with you) in which case we may use
          this information indefinitely without further notice to you.
        </p>
        <p>
          We employ industry standard security measures designed to protect the
          security of all information submitted through the Services. However,
          the security of information transmitted through the internet can never
          be guaranteed. We are not responsible for any interception or
          interruption of any communications through the internet or for changes
          to or losses of data. Users of the Services are responsible for
          maintaining the security of any password, biometrics, user ID or other
          form of authentication involved in obtaining access to password
          protected or secure areas of any of our digital services. In order to
          protect you and your data, we may suspend your use of any of the
          Services, without notice, pending an investigation, if any breach of
          security is suspected.
        </p>
        <h2>Information Choices and Changes</h2>
        <h3>Accessing, Updating, Correcting, and Deleting your Information</h3>
        <p>
          You may access information that you have voluntarily provided through
          your account on the Services, and to review, correct, or delete it by
          sending a request to&nbsp;
          <a href="mailto:legal@otonomos.com">legal@otonomos.com</a>. You can
          request to change contact choices, opt-out of our sharing with others,
          and update your personal information and preferences.
        </p>
        <h3>Tracking Technologies Generally</h3>
        <p>
          Regular cookies may generally be disabled or removed by tools
          available as part of most commercial browsers, and in some instances
          blocked in the future by selecting certain settings. For more
          information, please see the section entitled &quot;Cookies
          Policy&quot; below.
        </p>
        <h3>Google Analytics</h3>
        <p>
          You may exercise choices regarding the use of cookies from Google
          Analytics by going to&nbsp;
          <a href="https://tools.google.com/dlpage/gaoptout">
            Google Analytics Opt-out
          </a>
          &nbsp;and downloading the Google Analytics Opt-out Browser Add-on.
        </p>
        <h2>Contact Information</h2>
        <p>
          We welcome your comments or questions about this Policy, and you may
          contact us at:&nbsp;
          <a href="mailto:legal@otonomos.com">legal@otonomos.com</a>.
        </p>
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may change this Privacy Policy at any time. We encourage you to
          periodically review this page for the latest information on our
          privacy practices. If we make any changes, we will change the Last
          Updated &nbsp;date above.
        </p>
        <p>
          Any modifications to this Privacy Policy will be effective upon our
          posting of the new terms and/or upon implementation of the changes to
          the Site (or as otherwise indicated at the time of posting). In all
          cases, your continued use of the the Site or Services after the
          posting of any modified Privacy Policy indicates your acceptance of
          the terms of the modified Privacy Policy.
        </p>
        <h2>Eligibility</h2>
        <p>
          If you are under the age of majority in your jurisdiction of
          residence, you may use the Services only with the consent of or under
          the supervision of your parent or legal guardian. Consistent with the
          requirements of the Children&#39;s Online Privacy Protection Act
          (COPPA), if we learn that we have received any information directly
          from a child under age 13 without first receiving his or her
          parent&#39;s verified consent, we will use that information only to
          respond directly to that child (or his or her parent or legal
          guardian) to inform the child that he or she cannot use the Site and
          subsequently we will delete that information.
        </p>
        <h2>Attorney Communication</h2>
        <p>
          If you choose to communicate with an attorney through our Services,
          please note that any such communications between you and such attorney
          may not necessarily be treated as confidential information by the
          attorney or protected by the attorney-client privilege doctrine. For
          additional information, please read the &quot;Overview&quot; section
          in our <Link to="/terms">Terms of Use</Link>.
        </p>
        <h2>Notice to California Residents</h2>
        <p>
          Under California Civil Code Section 1789.3, California users are
          entitled to the following consumer rights notice: California residents
          may reach the Complaint Assistance Unit of the Division of Consumer
          Services of the California Department of Consumer Affairs by mail at
          1625 North Market Blvd., Sacramento, CA 95834, or by telephone at
          (916) 445-1254 or (800) 952-5210.
        </p>
        <p>
          This section provides additional details about the personal
          information we collect about California consumers and the rights
          afforded to them under the California Consumer Privacy Act or
          &quot;CCPA.&quot;
        </p>
        <p>
          For more details about the personal information we collect from you,
          please see the &quot;What We Collect&quot; section above. We collect
          this information for the business and commercial purposes described in
          the &quot;Use of Personal Information&quot; section above. We share
          this information with the categories of third parties described in the
          &quot;Sharing of Personal Information&quot; section above. Company
          does not sell (as such term is defined in the CCPA) the personal
          information we collect (and will not sell it without providing a right
          to opt out). Please refer to our Cookie Policy below for more
          information regarding the types of third-party cookies, if any, that
          we use.
        </p>
        <p>
          Subject to certain limitations, the CCPA provides California consumers
          the right to request to know more details about the categories or
          specific pieces of personal information we collect (including how we
          use and disclose this information), to delete their personal
          information, to opt out of any &quot;sales&quot; that may be
          occurring, and to not be discriminated against for exercising these
          rights.
        </p>
        <p>
          California consumers may make a request pursuant to their rights under
          the CCPA by contacting us at&nbsp;
          <a href="mailto:legal@otonomos.com">legal@otonomos.com</a>. Please
          note that you must verify your identity and request before further
          action is taken. As a part of this process, government identification
          may be required. Consistent with California law, you may designate an
          authorized agent to make a request on your behalf. In order to
          designate an authorized agent to make a request on your behalf, you
          must provide a valid power of attorney, the requester&#39;s valid
          government issued identification, and the authorized agent&#39;s valid
          government issued identification.
        </p>
        <h2>Notice to EU Data Subjects</h2>
        <h3>Personal Information</h3>
        <p>
          With respect to EU data subjects, &quot;personal information,&quot; as
          used in this Privacy Policy, is equivalent to &quot;personal
          data&quot; as defined in the
          <a href="https://gdpr-info.eu/art-4-gdpr/">
            European Union General Data Protection Regulation
          </a>
          &nbsp;(GDPR).
        </p>
        <h3>Sensitive Data</h3>
        <p>
          Some of the information you provide us may constitute sensitive data
          as defined in the GDPR (also referred to as special categories of
          personal data), including identification of your race or ethnicity on
          government-issued identification documents.
        </p>
        <h3>Legal Bases for Processing</h3>
        <p>
          We only use your personal information as permitted by law. We are
          required to inform you of the legal bases of our processing of your
          personal information, which are described in the table below. If you
          have questions about the legal bases under which we process your
          personal information, contact us at&nbsp;
          <a href="mailto:legal@otonomos.com">legal@otonomos.com</a>.
        </p>
        <table className="table table-sm table-hover table-responsive">
          <thead>
            <th>Processing&nbsp;Purpose</th>
            <th>Legal Basis</th>
          </thead>
          <tbody>
            <tr>
              <td>To provide our service</td>
              <td>
                Our processing of your personal information is necessary to
                perform the contract governing our provision of the Services or
                to take steps that you request prior to signing up for the
                Service.
              </td>
            </tr>
            <tr>
              <td>
                To communicate with you; to optimize our platform; for
                compliance, fraud prevention, and safety; to provide our service
              </td>
              <td>
                These processing activities constitute our legitimate interests.
                We make sure we consider and balance any potential impacts on
                you (both positive and negative) and your rights before we
                process your personal information for our legitimate interests.
                We do not use your personal information for activities where our
                interests are overridden by any adverse impact on you (unless we
                have your consent or are otherwise required or permitted to by
                law).
              </td>
            </tr>
            <tr>
              <td>To comply with law</td>
              <td>
                We use your personal information to comply with applicable laws
                and our legal obligations, including anti-money laundering (AML)
                laws and know-your-customer (KYC) requirements.
              </td>
            </tr>
            <tr>
              <td>With your consent</td>
              <td>
                Where our use of your personal information is based upon your
                consent, you have the right to withdraw it anytime in the manner
                indicated in the Service or by contacting us at&nbsp;
                <a href="mailto:legal@otonomos.com">legal@otonomos.com</a>
                &nbsp;.
              </td>
            </tr>
          </tbody>
        </table>
        <h3>Use for New Purposes</h3>
        <p>
          We may use your personal information for reasons not described in this
          Privacy Policy, where we are permitted by law to do so and where the
          reason is compatible with the purpose for which we collected it. If we
          need to use your personal information for an unrelated purpose, we
          will notify you and explain the applicable legal basis for that use.
          If we have relied upon your consent for a particular use of your
          personal information, we will seek your consent for any unrelated
          purpose.
        </p>
        <h3>Your Rights</h3>
        <p>
          Under the GDPR, you have certain rights regarding your personal
          information. You may ask us to take the following actions in relation
          to your personal information that we hold:
        </p>
        <p>
          <ul>
            <li>
              Opt-out. &nbsp;Stop sending you direct marketing communications
              which you have previously consented to receive. We may continue to
              send you Service-related and other non-marketing communications.
            </li>
            <li>
              Access. &nbsp;Provide you with information about our processing of
              your personal information and give you access to your personal
              information.
            </li>
            <li>
              Correct. &nbsp;Update or correct inaccuracies in your personal
              information.
            </li>
            <li>Delete. &nbsp;Delete your personal information.</li>
            <li>
              Transfer. &nbsp;Transfer a machine-readable copy of your personal
              information to you or a third party of your choice.
            </li>
            <li>
              Restrict. &nbsp;Restrict the processing of your personal
              information.
            </li>
            <li>
              Object. &nbsp;Object to our reliance on our legitimate interests
              as the basis of our processing of your personal information that
              impacts your rights.
            </li>
          </ul>
        </p>
        <p>
          You can submit these requests by email to&nbsp;
          <a href="mailto:legal@otonomos.com">legal@otonomos.com</a>. We may
          request specific information from you to help us confirm your identity
          and process your request. Applicable law may require or permit us to
          decline your request. If we decline your request, we will tell you
          why, subject to legal restrictions. If you would like to submit a
          complaint about our use of your personal information or response to
          your requests regarding your personal information, you may contact us
          at&nbsp;<a href="mailto:legal@otonomos.com">legal@otonomos.com</a>
          &nbsp;or submit a complaint to the data protection regulator in your
          jurisdiction. You can find your data protection regulator&nbsp;
          <a href="https://ec.europa.eu/justice/article-29/structure/data-protection-authorities/index_en.htm">
            here
          </a>
          .
        </p>
        <h3>Cross-Border Data Transfer</h3>
        <p>
          Please be aware that your personal data will be transferred to,
          processed, and stored in the United States. Data protection laws in
          the U.S. may be different from those in your country of residence. You
          consent to the transfer of your information, including personal
          information, to the U.S. as set forth in this Privacy Policy by
          visiting our site or using our service.
        </p>
        <p>
          Whenever we transfer your personal information out of the EEA to the
          U.S. or countries not deemed by the European Commission to provide an
          adequate level of personal information protection, the transfer will
          be based on a data transfer mechanism recognized by the European
          Commission as providing adequate protection for personal information.
        </p>
        <p>
          Please contact us if you want further information on the specific
          mechanism used by us when transferring your personal information out
          of the EEA.
        </p>
        <h2>Cookies Policy</h2>
        <p>
          We understand that your privacy is important to you and are committed
          to being transparent about the technologies we use. In the spirit of
          transparency, this policy provides detailed information about how and
          when we use cookies on our Site.
        </p>
        <h3>Do we use Cookies?</h3>
        <p>
          Yes. We and our marketing partners, affiliates, and analytics or
          service providers use cookies, web beacons, or pixels and other
          technologies to ensure everyone who uses the Site has the best
          possible experience.
        </p>
        <h3>What is a Cookie?</h3>
        <p>
          A cookie (&quot;Cookie&quot;) is a small text file that is placed on
          your hard drive by a web page server. Cookies contain information that
          can later be read by a web server in the domain that issued the cookie
          to you. Some of the cookies will only be used if you use certain
          features or select certain preferences, and some cookies will always
          be used. You can find out more about each cookie by viewing our
          current cookie list below. We update this list periodically, so there
          may be additional cookies that are not yet listed. Web beacons, tags
          and scripts may be used in the Site or in emails to help us to deliver
          cookies, count visits, understand usage and campaign effectiveness and
          determine whether an email has been opened and acted upon. We may
          receive reports based on the use of these technologies by our
          service/analytics providers on an individual and aggregated basis.
        </p>
        <h3>Why do we use Cookies?</h3>
        <p>We generally use Cookies for the following purposes:</p>
        <p>
          <ul>
            <li>To recognize new or past customers.</li>
            <li>To store your password if you are registered on our Site.</li>
            <li>
              To improve our Site and to better understand your visits on our
              platforms and Site.
            </li>
            <li>To serve you with interest-based or targeted advertising.</li>
            <li>
              To observe your behaviors and browsing activities over time across
              multiple websites or other platforms.
            </li>
            <li>
              To better understand the interests of our customers and our
              website visitors.
            </li>
          </ul>
        </p>
        <p>
          Some Cookies are necessary for certain uses of the Site, and without
          such Cookies, we would not be able to provide many services that you
          need to properly use the Site. These Cookies, for example, allow us to
          operate our Site so you may access it as you have requested and let us
          recognize that you have created an account and have logged into that
          account to access Site content. They also include Cookies that enable
          us to remember your previous actions within the same browsing session
          and secure our Sites.
        </p>
        <p>
          We also use functional Cookies and Cookies from third parties for
          analysis and marketing purposes. Functional Cookies enable certain
          parts of the site to work properly and your user preferences to remain
          known. Analysis Cookies, among other things, collect information on
          how visitors use our Site, the content and products that users view
          most frequently, and the effectiveness of our third-party advertising.
          Advertising Cookies assist in delivering ads to relevant audiences and
          having our ads appear at the top of search results. Cookies are either
          &quot;session&quot; Cookies which are deleted when you end your
          browser session, or &quot;persistent,&quot; which remain until their
          deletion by you (discussed below) or the party who served the cookie.
          Full details on all of the Cookies used on the Site are available at
          our Cookie Disclosure table below.
        </p>
        <h3>How to disable Cookies</h3>
        <p>
          You can generally activate or later deactivate the use of cookies
          through a functionality built into your web browser. To learn more
          about how to control cookie settings through your browser:
        </p>
        <p>
          <ul>
            <li>
              Click&nbsp;
              <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences">
                here
              </a>
              &nbsp;to learn more about the &quot;Private Browsing&quot; setting
              and managing cookie settings in Firefox;
            </li>
            <li>
              Click&nbsp;
              <a href="https://support.google.com/chrome/answer/95647">here</a>
              &nbsp;to learn more about &quot;Incognito&quot; and managing
              cookie settings in Chrome;
            </li>
            <li>
              Click&nbsp;
              <a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies">
                here
              </a>
              &nbsp;to learn more about &quot;InPrivate&quot; and managing
              cookie settings in Internet Explorer; or
            </li>
            <li>
              Click&nbsp;
              <a href="https://support.apple.com/guide/safari/browse-in-private-ibrw1069/mac">
                here
              </a>
              &nbsp;to learn more about &quot;Private Browsing&quot; and
              managing cookie settings in Safari.
            </li>
          </ul>
        </p>
        <p>
          If you want to learn more about cookies, or how to control, disable or
          delete them, please visit&nbsp;
          <a href="http://www.aboutcookies.org/">http://www.aboutcookies.org</a>
          &nbsp;for detailed guidance. In addition, certain third party
          advertising networks, including Google, permit users to opt out of or
          customize preferences associated with your internet browsing. To learn
          more about this feature from Google, click&nbsp;
          <a href="https://adssettings.google.com/u/0/">here</a>.
        </p>
        <p>
          To control flash cookies, which we may use on our Site from time to
          time, you can go to this&nbsp;
          <a href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html">
            link
          </a>
          &nbsp;because Flash cookies cannot be controlled through your browser
          settings. Please note that if you decline the use of Cookies, some
          functions of the website may be unavailable and we will not be able to
          present personally tailored content and advertisements to you.
        </p>
        <p>
          We may link the information collected by Cookies with other
          information we collect from you pursuant to this Privacy Policy and
          use the combined information as set forth herein. Similarly, the third
          parties who serve cookies on our Site may link your name or email
          address to other information they collect, which may include past
          purchases made offline or online, or your online usage information. If
          you are located in the European Economic Area, you have certain rights
          that are described above under the header &quot;Notice to EU Data
          Subjects&quot;, including the right to inspect and correct or delete
          the data that we have about you.
        </p>
        <h3>Cookies Disclosure</h3>
        <table className="table table-sm table-responsive">
          <caption className="mt-3">
            <ol>
              <li>Name of the Cookie or Identifier</li>
              <li>
                What does the cookie generally do (e.g., website function and
                administration, analytics, marketing)?
              </li>
              <li>
                Is it a 1st or 3rd party cookie and what is the name of the
                party providing it?
              </li>
              <li>What type of cookie is it (persistent or session)?</li>
              <li>
                What is the duration of the cookie on the website (if not
                cleared by the user)?
              </li>
            </ol>
          </caption>
          <thead>
            <th>
              Cookie's name<sup>1</sup>
            </th>
            <th>
              What it does?<sup>2</sup>
            </th>
            <th>
              From where?<sup>3</sup>
            </th>
            <th>
              What type?<sup>4</sup>
            </th>
            <th>
              For how long?<sup>5</sup>
            </th>
          </thead>
          <tbody>
            <tr>
              <td>Google Analytics</td>
              <td>Analytics</td>
              <td>3rd - Google</td>
              <td>Persistent</td>
              <td>2 years</td>
            </tr>
            <tr>
              <td>Dashpanel welcome cookie</td>
              <td>Website function</td>
              <td>1st - OtoCo</td>
              <td>Persistent</td>
              <td>1 year</td>
            </tr>
            <tr>
              <td>_ ga</td>
              <td>Used to distinguish users</td>
              <td>3rd - Google</td>
              <td>Persistent</td>
              <td>2 years</td>
            </tr>
            <tr>
              <td>_ gid</td>
              <td>Used to distinguish users</td>
              <td>3rd - Google</td>
              <td>Persistent</td>
              <td>2 years</td>
            </tr>
            <tr>
              <td>gat gtag_</td>
              <td>Used to throttle request rate</td>
              <td>3rd - Google</td>
              <td>Persistent</td>
              <td>1 minute</td>
            </tr>
            <tr>
              <td>_ _ cfduid</td>
              <td>Used to distinguish users</td>
              <td>3rd - Cloudflare</td>
              <td>Persistent</td>
              <td>1 year</td>
            </tr>
            <tr>
              <td>PLAY_SESSION</td>
              <td>Used to distinguish users</td>
              <td>1st - OtoCo</td>
              <td>Session</td>
              <td>Session</td>
            </tr>
          </tbody>
        </table>
        <p></p>
      </div>
    </Layout>
  )
}

export default Terms
