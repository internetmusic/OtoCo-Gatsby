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
      <div className="container-xl content terms">
        <h1 className="title">TERMS OF USE</h1>
        <span className="c12">
          Welcome to OtoCo! Please read these Terms of Use (the “Agreement” or
          “Terms”) carefully, along with any other policies or notices and our
          Privacy Policy (defined below) located at&nbsp;
        </span>
        <span className="c5">
          <Link to="/privacy">Privacy</Link>
        </span>
        <span className="c12">
          , as they lay out the rules, terms, and guidelines for you to follow
          when using and accessing our website&nbsp;
        </span>
        <span className="c5">
          <a className="c8" href="">
            otoco.io
          </a>
        </span>
        <span className="c4">
          &nbsp;(“OtoCo” or the “Site”) (collectively, the “Services”). This
          Agreement governs your use of OtoCo and constitutes a legally binding
          agreement between each user (“you,” “your,” or “User”) and Otonomos
          LLC (“we,” “us,” or “our”).
        </span>
        <p className="c0">
          <span className="c4">
            By using OtoCo, you agree to follow and be bound by these Terms and
            agree to comply with all applicable local, state, and federal laws
            and regulations. If you do not agree to the terms of this Agreement,
            do not access OtoCo.
          </span>
        </p>
        <p className="c0">
          <span className="c12">
            We may revise these Terms at any time without notice to you. If you
            have any questions about these Terms, please contact us at&nbsp;
          </span>
          <span className="c5">
            <a className="c8" href="mailto:support@otonomos.com">
              support@otonomos.com
            </a>
          </span>
          <span className="c4">.</span>
        </p>
        <p className="c0">
          <span className="c4">
            In order to use OtoCo you must register for and maintain an active
            personal user Services account (“Account”). You must be at least
            eighteen (18) years of age, or the age of legal majority in your
            jurisdiction (if different than 18), to obtain an Account, unless a
            specific Service permits otherwise.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">Overview</span>
        </p>
        <p className="c0">
          <span className="c4">
            We know terms and conditions can be long, confusing, and full of
            legalese, so we will do our best to keep things as clear and concise
            as possible. This section is a brief summary of the highlights of
            this Agreement. Know that when you accept this Agreement, you are
            accepting all of our Terms and not just this section. Simply by
            using OtoCo, including browsing the Site, you are agreeing to our
            Terms, so please read carefully. Grab a pair of glasses if you need
            to.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            OtoCo is an online company formation and management portal which
            provides users with a blockchain-based protocol for an automated
            solution for individuals and entities who choose to form legal
            entities and manage their funding and governance. OtoCo hosts
            blockchain software as a backend service for customers who create
            their own legal entities. You can use the OtoCo platform to create
            smart contracts, add information to blockchain using cryptocurrency
            (ETH e.a.), and other actions permitted by these Terms.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            At no time do we, or will we, review your content or agreements for
            legal sufficiency, draw legal conclusions, or provide legal advice,
            opinions, or recommendations about your legal rights, remedies,
            defenses, options, selection of forms, or strategies. OtoCo is not a
            law firm and may not perform services performed by an attorney.
            Please note that any communications between you and OtoCo are not
            protected as confidential information under the attorney-client
            privilege or work product doctrine. OTOCO, ITS SERVICES, AND ITS
            FORMS OR TEMPLATES ARE NOT A SUBSTITUTE FOR THE ADVICE OR SERVICES
            OF AN ATTORNEY.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            OtoCo attempts to keep its legal documents accurate and up-to-date.
            However, because the law changes rapidly, OtoCo cannot guarantee
            that all of the information is completely current. The law differs
            from jurisdiction to jurisdiction, and may be subject to
            interpretation by different courts. The law is a personal matter,
            and no general information or legal tool like the kind OtoCo
            provides can accommodate all circumstances.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            The legal information contained on OtoCo and the Service does not
            constitute legal advice and is not guaranteed to be correct,
            complete, or up-to-date. Therefore, if you need legal advice for
            your specific problem, or if your specific problem is too complex to
            be addressed by our tools, you should consult a licensed attorney in
            your area. AGREEMENTS OR CONTRACTS PROVIDED BY OTOCO ARE NOT A
            SUBSTITUTE FOR LEGAL ADVICE FROM A QUALIFIED ATTORNEY LICENSED TO
            PRACTICE IN AN APPROPRIATE JURISDICTION.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            These Terms outline approved uses of OTOCO, various licenses we
            grant to you, and the licenses you grant to us. We take our
            commitment to customer service seriously and will work with you to
            make sure you are happy with your programming challenges.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">How You Accept These Terms</span>
        </p>
        <p className="c0">
          <span className="c12">
            By accessing or using OtoCo in any manner, you acknowledge that you
            have read, understood, and agree to these Terms, as well as the
            accompanying privacy policy (“Privacy Policy”), which is accessible
            at&nbsp;
          </span>
          <span className="c5">
            <a
              className="c8"
              href="https://www.google.com/url?q=https://www.otoco.io/privacy&amp;sa=D&amp;ust=1593561844175000&amp;usg=AOvVaw28LwQuQ86275Df331jHhvl"
            >
              otoco.io/privacy
            </a>
          </span>
          <span className="c4">.</span>
        </p>
        <p className="c0">
          <span className="c12">
            Note that we reserve the right to modify the Terms at any time in
            our sole discretion. Any changes to the Terms will be posted on our
            website at&nbsp;
          </span>
          <span className="c5">
            <a
              className="c8"
              href="https://www.google.com/url?q=https://www.otoco.io/terms&amp;sa=D&amp;ust=1593561844176000&amp;usg=AOvVaw3PYjn-R8uaSHPeL8-kpWWv"
            >
              otoco.io/terms
            </a>
          </span>
          <span className="c4">
            &nbsp;and will become effective immediately upon posting. It is your
            responsibility to check for updates to this Agreement periodically.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            If the changes are significant, we will do our best to notify you
            via email or through a notification. Please check the effective date
            above to determine if there have been any changes since you last
            reviewed these Terms.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            If you do not agree to this Agreement or any modifications to this
            Agreement, you should not use OtoCo. Your continued use of OtoCo
            after any amendment or modification to the Agreement constitutes
            your consent to the amended or modified Agreement.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">Eligibility</span>
        </p>
        <p className="c0">
          <span className="c4">
            You must be at least eighteen (18) years of age, or the age of legal
            majority in your jurisdiction (if different than eighteen (18) years
            of age), to use our Services. If you are under eighteen (18) years
            old and would like to use OtoCo, you can, but only if a parent or
            legal guardian who is at least eighteen (18) years old supervises
            you. In all cases, such adult will be considered the User and is
            responsible for any and all activity on your Account.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            You can only use OtoCo to the extent the laws of your jurisdiction
            or the United States do not bar you from doing so. Please make sure
            these Terms are in compliance with all laws, rules, and regulations
            that apply to you.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            By using OtoCo, you represent and warrant that you meet all
            eligibility requirements we outline in these Terms. We may still
            refuse to let certain people access or use our Services. We may also
            change our eligibility criteria at any time.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            We offer our Services only for personal, non-commercial use and not
            for the use or benefit of any third party (unless you are a parent
            or legal guardian using our Services for your minor child).
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">Your Account With OtoCo</span>
        </p>
        <p className="c0">
          <span className="c4">
            You will need to create an Account with OtoCo in order to access our
            Services. . In order to create an Account, you mayneed to provide us
            with your your full name, organization, email address, phone number,
            billing address and account login information. In addition, we may
            collect information regarding other accounts you choose to link with
            OtoCo (e.g., Metamask, Google, etc.).
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            By creating an Account, here are a few common sense rules and
            acknowledgements that we ask you comply with and understand:
          </span>
        </p>
        <p className="c0">
          <span className="c1">Be honest with us</span>
          <span className="c4">
            . Provide accurate information about yourself. It’s not OK to use
            false information or impersonate another person or company through
            your Account. Any failure to provide complete and accurate
            information can lead to the immediate termination of your Account --
            and we don’t want to do that!
          </span>
        </p>
        <p className="c0">
          <span className="c1">You’re responsible for your Account</span>
          <span className="c4">
            . You’re solely responsible for any activity on your Account. If
            you’re sharing an Account with other people (e.g., if you’re
            representing a business entity), then you will ultimately be
            responsible for all activity. If you’re registering as a business
            entity, you personally guarantee that you have the authority to
            agree to the Terms on behalf of the business. Your Account is not
            transferable. You are solely responsible for any activity on your
            Account, so it’s important to keep your Account password secure. In
            case of a dispute over the identity of the user, the authorized
            account holder of the OtoCo account will be deemed to be the user.
            “Authorized account holder” of an account is defined as the natural
            person assigned to the email address associated with the Account.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Be clear about our relationship</span>
          <span className="c4">
            . Creating an account with OtoCo, or using our Site or Services,
            does not create an agency, partnership, joint venture, employment,
            attorney-client, or franchisee relationship with us. No
            confidential, fiduciary, contractually implied, or other
            relationship is created with us other than pursuant to these Terms.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Passwords</span>
          <span className="c4">
            . You’re responsible for safeguarding the password that you use to
            access OtoCo and for any activities or actions under your password
            -- that means no sharing with third parties either. We encourage you
            to use “strong” passwords with your Account. Your password must be
            at least eight (8) characters long.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Emails</span>
          <span className="c4">
            . By creating an Account, you agree that you may receive
            communications from OtoCo or its affiliated companies including
            Otonomos, such as newsletters, special offers, and account reminders
            and updates. You also understand that you can remove yourself from
            these communications by clicking the `Unsubscribe` link in the
            footer of the actual emails.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Impersonation</span>
          <span className="c4">
            . If someone has created an account in which he or she pretends to
            be you, and you send us a request to take down that account, please
            be sure that you have included the email address of the fake
            account. You agree to: (a) immediately notify us upon becoming aware
            of any unauthorized use of your password or Account or any other
            breach of security; and, (b) ensure that you exit from your Account
            at the end of each session when using OtoCo.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            We will not be liable for any loss or damage arising from your
            failure to comply with this section of the Terms.
          </span>
        </p>
        <p className="c0">
          <span className="c12">Please contact&nbsp;</span>
          <span className="c5">
            <a className="c8" href="mailto:support@otonomos.com">
              support@otonomos.com
            </a>
          </span>
          <span className="c4">
            &nbsp;if you have any questions about registering your Account with
            OtoCo.
          </span>
        </p>
        <p className="c3">
          <span className="c4">Third Party Services and Content</span>
        </p>
        <p className="c0">
          <span className="c4">
            Our Services may contain links to third-party websites or services
            that are not owned or controlled by OtoCo.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            We utilize links and other tools to connect users to third party
            services and websites, such as Google Analytics (“Third Party
            Services,” each a “Third Party Service”). We have no control over,
            and assume no liability or responsibility for, the content, privacy
            policies, or practices of these Third Party Services, or the
            accuracy, reliability, or currentness of those services.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            Users who access or use a Third Party Service through OtoCo are
            solely responsible for complying with the terms and policies of
            these third parties. We strongly advise you to read the terms and
            conditions and privacy policies of any Third Party Service that you
            visit.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            In no event shall a description or reference to a third party’s
            product or service (including, but not limited to, providing a
            description or reference via hyperlink) be construed as an
            endorsement of such third party product or service by us. We retain
            the exclusive right to add to, modify, or cancel the availability of
            any Third Party Service at any time.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">Intellectual Property</span>
        </p>
        <p className="c0">
          <span className="c4">
            OtoCo contains copyrighted material, trademarks, and other
            proprietary information, including but not limited to text,
            software, photos, and graphics, and may in the future include video,
            graphics, music, and sound (“Content”), which is protected by
            copyright law, registered and unregistered trademarks, database
            rights, and other intellectual property rights. Unless otherwise
            provided, we exclusively own the the Content and your use of OtoCo
            does not grant you any right, title, or interest in or to the
            Content.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">Your Use of Our Services</span>
        </p>
        <p className="c0">
          <span className="c4">
            You are responsible for all of your activity in connection with
            OtoCo and for any use of your OtoCo Account. When using OtoCo in
            accordance with these Terms, we grant you a limited, personal,
            non-commercial, non-exclusive, non-transferable, non-assignable, and
            revocable license to use OtoCo. When using our Services, we ask that
            you abide by some common sense ground rules:
          </span>
        </p>
        <p className="c0">
          <span className="c1">Don’t Use Our Services to Break the Law</span>
          <span className="c4">
            . You agree that you will not violate any laws when using OtoCo.
            This includes any local, provincial, state, federal, national, or
            international laws or regulations that may apply to you.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Don’t Try To Harm Our System</span>
          <span className="c4">
            . You agree not to distribute any virus, worm, Trojan horse, or
            other harmful computer code through OtoCo. You also agree to not
            take any action that may impose an unreasonable or
            disproportionately large load on our, or any of our Third party
            Services’, infrastructure.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Don’t Attempt to Circumvent Our Security</span>
          <span className="c4">
            . You agree not to bypass, circumvent, or attempt to bypass or
            circumvent any measures we may use to prevent or restrict access to
            OtoCo, including without limitation other accounts, computer
            systems, or networks connected to OtoCo.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Don’t Steal From Us</span>
          <span className="c4">
            . You agree not to “crawl,” “scrape,” “spider,” decipher, decompile,
            disassemble, reverse engineer, or otherwise attempt to derive any
            source code, data, or underlying ideas or algorithms of any part of
            OtoCo.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Don’t Copy From Us</span>
          <span className="c4">
            . You agree not to copy, imitate, mirror, reproduce, distribute,
            publish, download, display, perform, post, store, or transmit any of
            OtoCo’s Content, including without limitation any marks, in any form
            or by any means, including but not limited to electronic,
            mechanical, photocopying, recording, or otherwise.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Respect our Intellectual Property</span>
          <span className="c4">
            . The name “OtoCo” and any graphic elements, design elements,
            presentations, phrases, designs, logos, layout, and source code of
            OtoCo are owned by us and are protected by copyright, trademark, and
            other laws.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Respect our Service</span>
          <span className="c4">
            . Do not take any action that: (i) interferes or attempts to
            interfere with the proper working of OtoCo or any activities
            conducted using OtoCo; (ii) circumvents any security-related
            features of OtoCo; builds, or authorizes another party to build, a
            competitive product to OtoCo; (iii) recruits or otherwise solicits
            any user of OtoCo to join third-party services or websites that are
            competitive to OtoCo; or, (iv) bypasses any measures we may use to
            prevent or restrict access to OtoCo.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Provide Us with Feedback</span>
          <span className="c4">
            . Your feedback can help us improve your experience and our
            Services. Any unsolicited ideas or other materials you submit to
            OtoCo (and are not including your User Content (defined below)) are
            considered non-confidential and non-proprietary to you. You grant us
            a non-exclusive, worldwide, royalty-free, irrevocable,
            sub-licensable, perpetual license to use and publish those ideas and
            materials for any purpose, without compensation, credit, or
            acknowledgement.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Operation of Smart Contracts</span>
          <span className="c4">
            . OtoCo smart contracts will be issued on the Ethereum blockchain.
            In general, the underlying protocols are open source and anyone can
            use, copy, modify, and distribute them. Therefore, any failure or
            malfunctioning of the Ethereum protocol may renderOtoCo temporarily
            inoperable.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            Smart contracts are a new and relatively untested technology. In
            addition to the risks mentioned in these Terms, there are certain
            additional risks that the OtoCo platform cannot foresee. OtoCo is
            not responsible for the execution of smart contracts. These risks
            may manifest themselves in other forms of risk than those specified
            herein. By using OtoCo, you acknowledge and agree that OtoCo is not
            responsible for the operation of the underlying protocols and that
            OtoCo makes no guarantee of their functionality, security, or
            availability. You acknowledge and agree that OtoCo assumes
            absolutely no responsibility whatsoever with respect to any
            cryptocurrency loss or smart contract malfunction/mistake.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Use of Cryptocurrency</span>
          <span className="c4">
            . You represent and warrant that any cryptocurrency transfer that
            you make through OtoCo is legal in your jurisdiction. We will not be
            held liable for any loss or damages due to your non-compliance. All
            cryptocurrency transfers are made voluntarily and at your sole
            discretion, and you realize all risks of using cryptocurrency and
            blockchain technology, which are generally understood and recognized
            in accordance with the warnings of the financial regulators of
            countries across the world, as well as the risks specified in this
            Agreement. OtoCo is not responsible for any cryptocurrency that may
            be lost through the process of smart contract execution.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            Any use of OtoCo other than as specifically authorized in this
            Agreement, without our prior written permission, is strictly
            prohibited and will terminate your license to use OtoCo.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">
            License You Grant to Us Over User Content
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            There are areas of OtoCoand areas on Third Party Services where you
            can communicate with us. We do not own any of your content. However,
            by providing content to us, you grant us a license to use it. These
            communications between you and OtoCo will be referred to as “User
            Content.”
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            When you submit code, post, or otherwise direct communications to
            OtoCo (through the use of the Site, or via a phone call, email,
            Telegram or Discord message, etc., with a member of our team) you
            give us a license to modify, use, adapt, copy, and publish your User
            Content. You agree that this license includes the right for OtoCo to
            use your User Content for commercial advertising and promotional
            purposes and to improve the Site. You agree that the User Content
            provided to OtoCo is non-confidential and that OtoCo has the right
            to unrestricted use for any purpose, commercial or otherwise,
            without acknowledgment or compensation to you.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            In uploading any work through our Services as User Content, you
            authorize other members who have access to that Service to make
            personal and customary use of the work and acknowledge that its may
            not be protected by copyright.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Permission to Use Your Content</span>
          <span className="c12">
            . You retain all ownership rights (to the extent there is any) in
            any User Content that you post to OtoCo. However, by submitting any
            User Content, you hereby grant us a universal, irrevocable,
            perpetual, non-exclusive, transferable, royalty-free license to use,
            view, copy, adapt, modify, distribute, license (including under an
            open source license), sell, transfer, publicly display, publicly
            perform, transmit, stream, broadcast, access, view, and otherwise
            exploit such User Content, in full or in part, in connection with
            OtoCo, subject to the terms of our&nbsp;
          </span>
          <span className="c5">
            <a
              className="c8"
              href="https://www.google.com/url?q=https://www.otoco.io/privacy&amp;sa=D&amp;ust=1593561844182000&amp;usg=AOvVaw3YBP_Zs7w8jfAgIqRac5M4"
            >
              Privacy Policy
            </a>
          </span>
          <span className="c4">
            . Note that this means that we may use any published listings for
            commercial means and may sell or exchange information (except
            personal information pursuant to our Privacy Policy) with third
            parties.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Responsibility for Your Content</span>
          <span className="c4">
            . You should only provide Content that you have the right to share
            and are comfortable sharing with others under this Agreement. Don’t
            upload, post, or otherwise transmit any User Content to, or through,
            OtoCo that infringes, misappropriates, or otherwise violates any
            copyright, trademark, or other intellectual property right, right of
            privacy, right of publicity, or any other right of any entity or
            person, or that is unlawful, threatening, libelous, defamatory,
            obscene, scandalous, inflammatory, pornographic, or profane, or that
            could constitute or encourage conduct that would be considered a
            criminal offense, give rise to civil liability, or otherwise violate
            any law or OtoCo rule or policy. If you do so, we reserve the right
            to remove any and all of your User Content from OtoCo at any time in
            our sole discretion.
          </span>
        </p>
        <p className="c0">
          <span className="c1">Approval of Content</span>
          <span className="c4">
            . We do not verify or pre-approve any posted User Content, and
            material in the form of opinions are not our opinions.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">Intellectual Property Infringement</span>
        </p>
        <p className="c0">
          <span className="c4">
            If you think any of the Content or User Content on our Site
            infringes on your intellectual property rights (e.g., trademarks,
            patents, trade secrets, rights of publicity, etc.), send us a
            request to take down such infringing content by emailing us at
            support@otonomos.com and we’ll do our best to take it down as
            expeditiously as possible. Your complaint or request should include:
          </span>
        </p>
        <ul className="c2 lst-kix_list_1-0 start">
          <li className="c9">
            <span className="c4">
              The intellectual property you own that is being infringed;
            </span>
          </li>
          <li className="c9">
            <span className="c4">
              A description of the content you believe infringes upon your
              intellectual property;
            </span>
          </li>
          <li className="c9">
            <span className="c4">
              The website URL that contains or is associated with the infringing
              content; and
            </span>
          </li>
          <li className="c9">
            <span className="c4">
              A short explanation of how the content infringes your rights.
            </span>
          </li>
        </ul>
        <p className="c3 c10">
          <span className="c4"></span>
        </p>
        <p className="c3">
          <span className="c6 c1">Complaint Processing</span>
        </p>
        <p className="c0">
          <span className="c4">
            Once we receive a complaint, we will make best efforts to review it
            as soon as possible. If you have provided all of the information
            above, we will promptly remove or block access to the content and
            will send a notice to the other OtoCo user indicating that we have
            done so.
          </span>
        </p>
        <p className="c3">
          <span className="c4">Counter Notice</span>
        </p>
        <p className="c0">
          <span className="c4">
            If you receive a notice that we have removed infringing or false
            content, and you believe that we have acted as a result of
            misidentification or error, you can lodge a counter notice (“Counter
            Notice”) by emailing us at&nbsp;support@otonomos.com. Any Counter
            Notice should include:
          </span>
        </p>
        <ul className="c2 lst-kix_list_2-0 start">
          <li className="c9">
            <span className="c4">
              Your full name, telephone number, and email address;
            </span>
          </li>
          <li className="c9">
            <span className="c4">
              An identification of the material that we have taken down;
            </span>
          </li>
          <li className="c9">
            <span className="c4">
              A statement under penalty of perjury that you have a good faith
              belief that the material was removed as a result of mistake or
              misidentification;
            </span>
          </li>
          <li className="c9">
            <span className="c4">
              A statement that you consent to the jurisdiction of the U.S.
              District Court for the federal district in which you reside, and
              that you will accept service of process from the complaining party
              or its agent in the event that a lawsuit is filed against you
              relating to such content; and
            </span>
          </li>
          <li className="c9">
            <span className="c4">Your physical or electronic signature.</span>
          </li>
        </ul>
        <p className="c0">
          <span className="c4">
            If we receive such a Counter Notice, we will re-upload the content,
            unless we first receive notice from the complaining party that it
            has filed a lawsuit or other action seeking a court order to keep
            you from engaging in the allegedly infringing activity.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">
            Limitation of Liability &amp; Disclaimer of Warranties
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            You understand and agree that we have no control over, and no duty
            to take any action regarding:
          </span>
        </p>
        <ul className="c2 lst-kix_list_3-0 start">
          <li className="c9">
            <span className="c4">which members subscribe to OtoCo;</span>
          </li>
          <li className="c9">
            <span className="c4">
              what content you access via our Services;
            </span>
          </li>
          <li className="c9">
            <span className="c4">what effect the content may have on you;</span>
          </li>
          <li className="c9">
            <span className="c4">
              how you may interpret or use the content; or
            </span>
          </li>
          <li className="c9">
            <span className="c4">
              what actions you may take as a result of your exposure to the
              content.
            </span>
          </li>
        </ul>
        <p className="c0">
          <span className="c4">
            You release us from all liability related to you acquiring or not
            acquiring content through OtoCo. OtoCo may contain, or direct you to
            websites containing, information that some people may find offensive
            or inappropriate. We make no representations concerning any such
            content contained in or accessed through our Site, and we will not
            be responsible or liable for the accuracy, copyright compliance,
            legality, or decency of material contained in or accessed through
            OtoCo. Your interactions with organizations and/or individuals found
            on or through OtoCo, including membership payment or services, and
            any other terms, conditions, warranties, or representations
            associated with such dealings, are solely between you and such
            organizations and/or individuals.
          </span>
        </p>
        <p className="c3">
          <span className="c1 c6">
            Warranty &amp; Limitation of Liability (or The Things You Can’t Sue
            Us For)
          </span>
        </p>
        <p className="c7">
          <span className="c4">
            LIMITATION OF LIABILITY:TO THE FULLEST EXTENT PERMITTED BY
            APPLICABLE LAW, IN NO EVENT WILL WE OR ANY OF OUR OFFICERS,
            DIRECTORS, REPRESENTATIVES, AGENTS, SERVANTS, COUNSEL, EMPLOYEES,
            CONSULTANTS, LAWYERS, AND OTHER PERSONNEL AUTHORIZED TO ACT, ACTING,
            OR PURPORTING TO ACT ON OUR BEHALF (COLLECTIVELY THE “OtoCo
            PARTIES”) BE LIABLE TO YOU UNDER CONTRACT, TORT, STRICT LIABILITY,
            NEGLIGENCE, OR ANY OTHER LEGAL OR EQUITABLE THEORY, FOR: (A) ANY
            LOST PROFITS, DATA LOSS, COST OF PROCUREMENT OF SUBSTITUTE GOODS OR
            SERVICES, OR DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE,
            COMPENSATORY, OR CONSEQUENTIAL DAMAGES (INCLUDING ATTORNEYS` FEES
            AND ALL RELATED COSTS AND EXPENSES OF LITIGATION AND ARBITRATION, OR
            AT TRIAL OR ON APPEAL, IF ANY, WHETHER OR NOT LITIGATION OR
            ARBITRATION IS INSTITUTED) OF ANY KIND WHATSOEVER RESULTING FROM:
            (I) YOUR ACCESS TO, USE OF, OR RELIANCE ON ANY CONTENT, MATERIALS,
            TEMPLATES, AGREEMENTS AND FORMS PROVIDED THROUGH THE SITE OR ANY
            ERRORS OR OMISSIONS IN ANY CONTENT, MATERIALS, TEMPLATES,
            AGREEMENTS, AND FORMS (II) YOUR ACCESS TO, USE OF, OR RELIANCE ON
            ANY SERVICE THROUGH THE SITE OR ANY ERRORS OR OMISSIONS IN ANY OTOCO
            SERVICE; (III) ANY UNAUTHORIZED ACCESS TO OR USE OF THE SITE OR
            OtoCo’S SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION
            AND/OR FINANCIAL INFORMATION STORED THEREIN; (IV) ANY INTERRUPTION
            OR CESSATION OF TRANSMISSION TO OR FROM THE SITE; OR (V) ANY BUGS,
            VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR
            THROUGH OUR SITE BY ANY THIRD PARTY (REGARDLESS OF THE SOURCE OF
            ORIGINATION), OR (B) ANY DIRECT DAMAGES IN EXCESS OF (IN THE
            AGGREGATE) OF THE GREATER OF: (I) FEES PAID TO US FOR THE APPLICABLE
            PRODUCTS; OR (II) $100.00.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            THESE LIMITATIONS APPLY REGARDLESS OF LEGAL THEORY, WHETHER BASED ON
            TORT, STRICT LIABILITY, BREACH OF CONTRACT, BREACH OF WARRANTY, OR
            ANY OTHER LEGAL THEORY, AND WHETHER OR NOT WE WERE ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGES.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
            LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, SO THE ABOVE
            LIMITATION MAY NOT APPLY TO YOU.
          </span>
        </p>
        <p className="c7">
          <span className="c4">
            WARRANTY DISCLAIMER:OtoCo AND ALL MATERIALS, DOCUMENTS OR FORMS
            PROVIDED ON OR THROUGH YOUR USE OF THE SITE OR SERVICES ARE PROVIDED
            ON AN `AS-IS` AND “AS-AVAILABLE” BASIS WITHOUT WARRANTY OF ANY KIND.
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL
            REPRESENTATIONS AND WARRANTIES OF ANY KIND, WHETHER EXPRESS OR
            IMPLIED, RELATING TO THE SITE OR ANY CONTENT ON THE SITE, WHETHER
            PROVIDED OR OWNED BY US OR BY ANY THIRD PARTY, INCLUDING WITHOUT
            LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, TITLE, NON-INFRINGEMENT, FREEDOM FROM COMPUTER VIRUS, AND
            ANY IMPLIED WARRANTIES ARISING FROM COURSE OF DEALING, COURSE OF
            PERFORMANCE, OR USAGE IN TRADE, ALL OF WHICH ARE EXPRESSLY
            DISCLAIMED. IN ADDITION, WE DO NOT REPRESENT OR WARRANT THAT THE
            CONTENT, MATERIALS AND FORMS ACCESSIBLE VIA THE SITE ARE ACCURATE,
            COMPLETE, AVAILABLE, CURRENT, FREE OF VIRUSES OR OTHER HARMFUL
            COMPONENTS, OR THAT THE RESULTS OF USING THE SITE WILL MEET YOUR
            REQUIREMENTS.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            OBTAINING ANY FORMS OR MATERIALS THROUGH THE USE OF THE SITE OR
            SERVICES IS DONE AT YOUR OWN DISCRETION AND AT YOUR OWN RISK. OtoCo
            SHALL HAVE NO RESPONSIBILITY FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM
            OR LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF ANY CONTENT,
            MATERIALS, INFORMATION OR SOFTWARE.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            SOME STATES DO NOT ALLOW THE DISCLAIMER OF IMPLIED WARRANTIES, SO
            THE FOREGOING DISCLAIMERS MAY NOT APPLY TO YOU. THIS PARAGRAPH GIVES
            YOU SPECIFIC LEGAL RIGHTS AND YOU MAY ALSO HAVE OTHER LEGAL RIGHTS
            THAT VARY FROM STATE TO STATE.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">
            Indemnification (or What Happens If You Get Us Sued)
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            To the extent permitted by applicable law, you agree to defend,
            indemnify, and hold harmless the OtoCo Parties from and against any
            and all claims, damages, obligations, losses, liabilities, costs or
            debt, and expenses (including but not limited to attorneys’ fees)
            arising from: (i) your use of and access to the Site; (ii) any User
            Content you post, program, upload, use, distribute, store, or
            otherwise transmit through the Site; (iii) your violation of any
            term of this Agreement; or, (iv) your violation of any law, rule, or
            regulation, or the rights of any third party.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">Time Limitation on Claims</span>
        </p>
        <p className="c0">
          <span className="c4">
            You agree that any claim you may have arising out of or related to
            your relationship with us must be filed within one (1) year after
            such claim arose where, for purposes of this section, the time that
            the injury or harm occurred – not when it was discovered thereafter
            – is where it arose; otherwise, your claim is permanently barred.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">Governing Law</span>
        </p>
        <p className="c0">
          <span className="c4">
            No matter where you’re located, the laws of the State of Delaware
            will govern these Terms and the parties’ relationship as if you
            signed these Terms in Delaware, without regard to Delawarestate’s
            conflicts of laws rules. If any provisions of these Terms are
            inconsistent with any applicable law, those provisions will be
            superseded or modified only to the extent such provisions are
            inconsistent. The parties agree to submit to the federal or state
            courts in Delaware for exclusive jurisdiction of any dispute arising
            out of or related to your use of the Services or your breach of
            these Terms.You waive any objection based on lack of personal
            jurisdiction, place of residence, improper venue, or forum non
            conveniens in any such action.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights. If any provision of
            these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect.
          </span>
        </p>
        <p className="c0">
          <span className="c6 c1">Note to International Users</span>
        </p>
        <p className="c0">
          <span className="c4">
            OtoCo is hosted in the United States. If you are a user accessing
            the Site from the European Union, Asia, or any other region with
            laws or regulations governing personal data collection, use, and
            disclosure that differ from United States laws, please be advised
            that through your continued use of the Site, which is governed by US
            law, you are transferring your personal information to the United
            States and you consent to that transfer.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">Termination</span>
        </p>
        <p className="c0">
          <span className="c4">
            We reserve the right to terminate your license to use OtoCo or block
            or prevent your access to the Site without providing you with notice
            or reason.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            If we terminate your account, you must immediately stop using OtoCo
            and you agree not to attempt to regain access to OtoCo without our
            express permission. Such termination will result in the suspension
            or deletion of your account and access to your account. In the event
            of termination of your account, the provisions of this Agreement
            shall remain in effect, and OtoCo reserves the right to retain any
            data or information you have provided to OtoCo or posted on OtoCo.
            We will not be liable to you for the effect that any changes to the
            Services may have on you, including your income or your ability to
            generate revenue through the Services.
          </span>
        </p>
        <p className="c0">
          <span className="c12">
            If you wish to terminate your account with OtoCo, please contact us
            at&nbsp;
          </span>
          <span className="c5">
            <a className="c8" href="mailto:support@otonomos.com">
              support@otonomos.com
            </a>
          </span>
          <span className="c4">
            . Terminating your account will not affect the availability of User
            Content that you posted through the Services prior to termination.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">No Waiver</span>
        </p>
        <p className="c0">
          <span className="c4">
            Our failure to exercise, or delay in exercising, any right, power,
            or privilege under this Agreement shall not operate as a waiver; nor
            shall any single or partial exercise of any right, power, or
            privilege preclude any other or further exercise thereof.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">Severability</span>
        </p>
        <p className="c0">
          <span className="c4">
            If it turns out that any term or provision of this Agreement is
            invalid, void, or, for any reason, unenforceable, such term or
            provision will be deemed severable and limited or eliminated to the
            minimum extent necessary. The limitation or elimination of the term
            or provision will not affect any other terms of this Agreement.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">
            Arbitration &amp; Waiver of Class Action
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            The parties agree to arbitrate any dispute arising from this
            Agreement or your use of the Site on an individual basis.
            ARBITRATION PREVENTS YOU FROM SUING IN COURT OR FROM HAVING A JURY
            TRIAL. THE PARTIES HEREBY EXPRESSLY WAIVE TRIAL BY JURY. The parties
            agree that: (i) any arbitration will occur in Delaware and, (ii) the
            arbitration will be conducted confidentially by a single arbitrator
            in accordance with the rules of American Arbitration Association for
            arbitration of consumer-related disputes, in the English language,
            and with limited discovery. At your request, hearings may be
            conducted in person or by telephone and the arbitrator may provide
            for submitting and determining motions on briefs, without oral
            hearings. Other than class procedures and remedies discussed below,
            the arbitrator has the authority to grant any remedy that would
            otherwise be available to a court or other tribunal. THE PREVAILING
            PARTY IN ANY ACTION OR PROCEEDING TO ENFORCE THESE TERMS SHALL BE
            ENTITLED TO COSTS AND ATTORNEYS` FEES. THE ARBITRAL DECISION MAY BE
            ENFORCED IN ANY COURT. WHETHER THE DISPUTE IS HEARD IN ARBITRATION
            OR IN COURT, YOU AND OTONOMOS LLC WILL NOT COMMENCE AGAINST THE
            OTHER A CLASS ACTION, CLASS ARBITRATION, OR REPRESENTATIVE ACTION OR
            PROCEEDING.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">Force Majeure</span>
        </p>
        <p className="c0">
          <span className="c4">
            We shall not be held liable for any delays, failure in performance,
            or interruptions of service which result directly or indirectly from
            any cause or condition beyond our reasonable control, including but
            not limited to: any delay or failure due to any act of God, act of
            civil or military authorities, act of terrorism, civil disturbance,
            war, strike or other labor dispute, fire, interruption in
            telecommunications or Internet services or network provider
            services, failure of equipment and/or software, other catastrophe,
            or any other occurrence which is beyond our reasonable control and
            shall not affect the validity and enforceability of any remaining
            provisions.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">Assignment</span>
        </p>
        <p className="c0">
          <span className="c4">
            You agree that we may assign any of our rights and/or transfer,
            sub-contract, or delegate any of our obligations under these Terms.
            Your agreement to these Terms is personal to you and you may not
            transfer or assign it to any third party.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">Entire Agreement</span>
        </p>
        <p className="c0">
          <span className="c4">
            This Agreement sets forth the entire understanding and agreement as
            to the subject matter hereof and supersedes any and all prior
            discussions, agreements, and understandings of any kind (including
            without limitation any prior versions of this Agreement) and every
            nature between us. Except as provided for above, any modification to
            this Agreement must be in writing and must be signed by both
            parties.
          </span>
        </p>
        <p className="c3">
          <span className="c6 c1">Questions or Comments</span>
        </p>
        <p className="c0">
          <span className="c4">
            We welcome comments, questions, concerns, and suggestions. If you
            are interested in advertising on OtoCo, please send us a message
            at&nbsp;.
          </span>
        </p>
        <p className="c0">
          <span className="c4">
            We know that terms can be long. Thanks for making it to the end!
          </span>
        </p>
      </div>
    </Layout>
  )
}

export default Terms
