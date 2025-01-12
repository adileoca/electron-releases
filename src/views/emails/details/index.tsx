import React, { useEffect, useState } from "react";
import { ParsedMail } from "mailparser";
import DOMPurify from "dompurify";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useParams } from "react-router-dom";
import { splitEmailContent, extractTextFromHtml } from "@/lib/utils/parseMail";
import { formatDate } from "@/lib/utils/format";
import ViewHeader from "./ui/ViewHeader";

type ExtendedMail = ParsedMail & { newHtml: string; historyHtml: string };

type ThreadType = {
  subject: string | undefined;
  text: string | undefined;
  messages: ExtendedMail[];
};

const EmailDetailedView: React.FC = () => {
  const [thread, setThread] = useState<ThreadType | undefined>();
  const { emailId } = useParams<{ emailId: string }>();

  useEffect(() => {
    console.log("emailId", emailId);
  }, [emailId]);
  useEffect(() => {
    const getThread = async () => {
      try {
        const parsedMessages = await Promise.all(
          threadData.messages.map(
            async (message) =>
              (await window.electron.invoke("parse-email", {
                data: message,
              })) as ParsedMail
          )
        );

        let newContentHistory: string[] = [];
        const messages = parsedMessages.map((message) => {
          const { newContent, conversationHistory } = splitEmailContent(
            message.html as string,
            newContentHistory
          );

          newContentHistory.push(extractTextFromHtml(newContent));
          console.log("newContentHistory", newContentHistory);
          return {
            ...message,
            newHtml: newContent,
            historyHtml: conversationHistory,
          };
        });

        setThread({
          subject: parsedMessages[0].subject,
          text: parsedMessages[0].text,
          messages: messages,
        });
      } catch (error) {
        console.error("Error retrieving email:", error);
      }
    };
    getThread();
  }, []);

  useEffect(() => {
    console.log("thread", thread);
  }, [thread]);

  return (
    <div
      style={{ width: "calc(100% - 192px)" }}
      className="fixed right-0 h-screen overflow-hidden shadow shadow-neutral-300 dark:shadow-none"
    >
      <ViewHeader title={thread && thread.subject} />
      <div
        style={{ height: "calc(100% - 48px)" }}
        className="flex w-full flex-col overflow-y-scroll bg-white/90"
      >
        {thread &&
          thread.messages.map((message, index: number) => (
            <div className="">
              <Disclosure
                key={index}
                as="div"
                className="w-full border-b border-neutral-200  dark:border-neutral-700"
              >
                {({ open }) => (
                  <>
                    <DisclosureButton className="top-0 flex w-full justify-between p-4 dark:bg-neutral-900/90">
                      <div className="flex w-full flex-col">
                        <ConversationHeader isOpen={open} message={message} />

                        {!open && (
                          <span className="mt-1 truncate text-left text-black/80 dark:text-white/80">
                            {message.text}
                          </span>
                        )}
                      </div>
                    </DisclosureButton>
                    <DisclosurePanel className="overflow-hidden pt-0 dark:bg-neutral-900/90">
                      <div className=" p-4 text-black">
                        {/* Render New Content */}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(message.newHtml),
                          }}
                        />
                        {/* Render Conversation History if it exists */}
                        {message.historyHtml &&
                          extractTextFromHtml(message.historyHtml) && (
                            <ConversationHistory html={message.historyHtml} />
                          )}
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
      </div>
    </div>
  );
};

const ConversationHeader = ({ isOpen, message }) => {
  const fromName = message.from!.value[0].name
    ? message.from!.value[0].name
    : message.from!.value[0].address!.split("@")[0];

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between space-x-1">
        <div className="flex items-center space-x-1">
          <h1 className="text-lg font-semibold text-black/90 dark:text-white/90">
            {fromName}
          </h1>
          {isOpen && (
            <span className="text-base font-normal text-black/70 dark:text-white/70">
              {`<${message.from!.value[0].address!}>`}
            </span>
          )}
        </div>
        <span className="text-black/80 dark:text-white/80">
          {formatDate(String(message.date!))}
        </span>

        {!open && (
          <span className="truncate text-left text-black/90 dark:text-white/90">
            {message.text}
          </span>
        )}
      </div>
    </div>
  );
};

const ConversationHistory = ({ html }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="mt-4 text-blue-600"
      >
        View full message
      </button>
      {isVisible && (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(html),
          }}
          className="mt-4 rounded-lg border border-neutral-200 bg-red-100 p-4 text-black"
        />
      )}
    </div>
  );
};

export default EmailDetailedView;

const message1 = `MIME-Version: 1.0
Date: Fri, 13 Sep 2024 17:19:39 +0300
Message-ID: <CAO_RwRvQ6oT+=p9QBCG-qHuUf8i7vxbnYHErGjd9af1DVPYqSg@mail.gmail.com>
Subject: info
From: Contact Fotoceramica <adipanfotoceramica@gmail.com>
To: c.nicolo@twesrl.it
Content-Type: multipart/alternative; boundary="000000000000e61fdd062200e9d7"

--000000000000e61fdd062200e9d7
Content-Type: text/plain; charset="UTF-8"

Hi,

Do you have any idea on how I can make this address within the character
limits? What to put in the indirizzo and what to put in nr. civico?

VIA F. PANZAROLA N.32, LOC. PONTE SAN GIOVANNI, PERUGIA
06126
PERUGIA
PERUGIA

--000000000000e61fdd062200e9d7
Content-Type: text/html; charset="UTF-8"
Content-Transfer-Encoding: quoted-printable

<div dir=3D"ltr">Hi,<div><br></div><div>Do you have any idea on how I can m=
ake this address within the character limits? What to put in the indirizzo =
and what to put in nr. civico?</div><div><br></div><div><span style=3D"colo=
r:rgb(77,77,77);font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Ari=
al,sans-serif;font-size:14px;font-style:italic">VIA F. PANZAROLA N.32, LOC.=
 PONTE SAN GIOVANNI, PERUGIA</span><br style=3D"color:rgb(77,77,77);font-fa=
mily:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size=
:14px;font-style:italic"><span style=3D"color:rgb(77,77,77);font-family:&qu=
ot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:14px;fo=
nt-style:italic">06126</span><br style=3D"color:rgb(77,77,77);font-family:&=
quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:14px;=
font-style:italic"><span style=3D"color:rgb(77,77,77);font-family:&quot;Hel=
vetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:14px;font-sty=
le:italic">PERUGIA</span><br style=3D"color:rgb(77,77,77);font-family:&quot=
;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:14px;font=
-style:italic"><span style=3D"color:rgb(77,77,77);font-family:&quot;Helveti=
ca Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:14px;font-style:i=
talic">PERUGIA</span><br></div></div>

--000000000000e61fdd062200e9d7--`;
const message2 = `Delivered-To: adipanfotoceramica@gmail.com
Received: by 2002:a54:2d0c:0:b0:270:20f9:92c6 with SMTP id i12csp1557397ecp;
        Fri, 13 Sep 2024 07:53:04 -0700 (PDT)
X-Google-Smtp-Source: AGHT+IEuLIdZ6EXPu8QqGixwNF/FmAsa04Unn1owi6hVsD7x17TM++97XrI6t2QX41q1OVUsCwiw
X-Received: by 2002:a05:6402:510f:b0:5c2:6083:6256 with SMTP id 4fb4d7f45d1cf-5c413e12255mr5446829a12.10.1726239184559;
        Fri, 13 Sep 2024 07:53:04 -0700 (PDT)
ARC-Seal: i=1; a=rsa-sha256; t=1726239184; cv=none;
        d=google.com; s=arc-20240605;
        b=B734US4wWybD5/K9aCGvF+RFyMtRcfTpQmwlGV5cik4NzkpO/houafZZQaBBzw6OFU
         LehuOCMUB5HjnRKt17OR2sgg3LUjOZkK9QGubnmikdPeJ/+q+Um68JDmeEXqkh2EEwhW
         3Ts1ONlY8Wydl5oRKdETAVh5qKJhTSkxc/GKy9/RMfo77dCeciUlSOt+UqbgH/mFNF/e
         dmj1oxiQrZDx8mO+r/erOkAauACngD0QvWtap1A2xjDYfEnAsvkVHFLgDZXzAEsFcxF4
         FsKn98Rtqa9FVt3w478ZEE4sXahxCPMatASo4bPaJFy3n7absqngqYLkE2KfNidD6CGq
         UtOw==
ARC-Message-Signature: i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20240605;
        h=content-language:thread-index:mime-version:message-id:date:subject
         :in-reply-to:references:to:from:dkim-signature;
        bh=xlmGwdowYA8VhU2Z23b5zq2MzD4qqyMug2k7sZhs8qA=;
        fh=kEPrwn4W4ptaoWl2Yqb/FY1FrvWp2aBAPELylHtvtgk=;
        b=JNsGXqTZuIAUcye5ob6kjLFJa7Q0GCJZ2An7oRUK7y4UlT51Ly3mhWo0JLyLdqe+5H
         zeHTrnI+Pq07NrTy8PVIr4Uk0O8K+Zy+K8Y5hVtcb/GK0aQcD3iPa7GluuFHyLKBpZEw
         aL0s0DDd2FtcLIjSMDxumkbrkD/AjCo/1poLmOa3F0+FJnwbHcrbKg3rMtcBizOfxq9W
         MdAPMEnsZx6VSnGAGPP5f77mvL52gpOyM6suCIGRd8nZMKCfu1+YduYP3Y44uutUOGPU
         pF6poYO/Azq0ngVQ3UoM1SdN/H7aVhCjoHWFy+KNuHFWxeP4Z3vHsNATcpMSDcSan1Ex
         jyHA==;
        dara=google.com
ARC-Authentication-Results: i=1; mx.google.com;
       dkim=pass header.i=@aruba.it header.s=a1 header.b=ditM05Zj;
       spf=pass (google.com: domain of c.nicolo@twesrl.it designates 62.149.158.149 as permitted sender) smtp.mailfrom=c.nicolo@twesrl.it;
       dmarc=pass (p=NONE sp=NONE dis=NONE) header.from=twesrl.it
Return-Path: <c.nicolo@twesrl.it>
Received: from smtpweb149.aruba.it (smtpweb149.aruba.it. [62.149.158.149])
        by mx.google.com with ESMTPS id 4fb4d7f45d1cf-5c3ebd42cd1si10545307a12.30.2024.09.13.07.53.04
        for <adipanfotoceramica@gmail.com>
        (version=TLS1_2 cipher=ECDHE-ECDSA-AES128-GCM-SHA256 bits=128/128);
        Fri, 13 Sep 2024 07:53:04 -0700 (PDT)
Received-SPF: pass (google.com: domain of c.nicolo@twesrl.it designates 62.149.158.149 as permitted sender) client-ip=62.149.158.149;
Authentication-Results: mx.google.com;
       dkim=pass header.i=@aruba.it header.s=a1 header.b=ditM05Zj;
       spf=pass (google.com: domain of c.nicolo@twesrl.it designates 62.149.158.149 as permitted sender) smtp.mailfrom=c.nicolo@twesrl.it;
       dmarc=pass (p=NONE sp=NONE dis=NONE) header.from=twesrl.it
Received: from PCdiNicolo ([95.254.132.80]) by Aruba Outgoing Smtp
  with ESMTPA id p7fUsDK7Axmtup7fUsyxR0; Fri, 13 Sep 2024 16:53:04 +0200
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/simple; d=aruba.it; s=a1; t=1726239184; bh=p4xixwof+UVGOxS1va010oIc8dwHtoebnnT9V4c30Bg=; h=From:To:Subject:Date:MIME-Version:Content-Type; b=ditM05Zj9G22wmARA69ETQwoZL32Vo1j/WMFHh2BpLSXkkpLEzcJT8iwjPA4NYBU4
	 UU9ZXj215e4a1dQJqi5Qo454YO+CaM4fdDEmO7NY1bZ2SO3KEkduD5DZalsuIneh/B
	 LbJjIckUpOZ7gbQiQ1osld+gqb6+Z3H7i81Ms3VlnP18YMap/ac25fUp5xVIr1VmvM
	 7AQaGw4GMvSonr6P0aspSzGlrYEgZ5PzLhb9lvFe+FftKOIDGsYMdYOi0T9h3qiAE5
	 ydnZR+96kI7xXJwAB6z+ZMpaHJIoh4Qr9SpQLXE7HSRhzHNmz8FDe4bGTkSN2XTwL/
	 g4PAI0YnCthlQ==
From: <c.nicolo@twesrl.it>
To: "'Contact Fotoceramica'" <adipanfotoceramica@gmail.com>
References: <CAO_RwRvQ6oT+=p9QBCG-qHuUf8i7vxbnYHErGjd9af1DVPYqSg@mail.gmail.com>
In-Reply-To: <CAO_RwRvQ6oT+=p9QBCG-qHuUf8i7vxbnYHErGjd9af1DVPYqSg@mail.gmail.com>
Subject: R: info
Date: Fri, 13 Sep 2024 16:53:04 +0200
Message-ID: <00dc01db05ec$a30d9a40$e928cec0$@twesrl.it>
MIME-Version: 1.0
Content-Type: multipart/alternative; boundary="----=_NextPart_000_00DD_01DB05FD.66966A40"
X-Mailer: Microsoft Outlook 16.0
Thread-Index: AQIRB+FNAJfajpvwLN3hkzD/7tZh5LHpyVnA
Content-Language: it
X-CMAE-Envelope: MS4xfPlaptjXFlkrlN8siBbjMs9UlPQcvgjXwAc1VflpogztLCIcwzC2aTtiUNy0A4a9IUXrTipdi6jQBdETi7I/zeQlaBjuyLZ+gBn5eXMEJEow7MCaxrPO +cUs+Dv3sVxnw5jD2oIEsP+s3TPfhisojCwRaXPYUwTUhqj9mVFI4y3CmFG4fxRPGrhEtrMF5b95jA==

------=_NextPart_000_00DD_01DB05FD.66966A40
Content-Type: text/plain; charset="UTF-8"
Content-Transfer-Encoding: quoted-printable

ADDRESS: VIA F. PANZAROLA 32

CITY: PONTE SAN GIOVANNI

CAP: 06126

PROVINCIA: PG

=20

Bye!

=20

Nicol=C3=B2 Castiglioni =E2=80=93 Twe srl

e-mail:    <mailto:c.nicolo@twesrl.it> c.nicolo@twesrl.it

Ai sensi del General Data Protection Regulation (GDPR) (EU) 2016/679,

Le e-mail provenienti dalla Twe srl sono trasmesse in buona fede e non comp=
ortano alcun vincolo ne' creano obblighi per la Twe srl stessa, salvo che c=
io' non sia espressamente previsto da un accordo scritto. Questa e-mail e' =
confidenziale. Qualora l'avesse ricevuta per errore, La preghiamo di comuni=
carne via e-mail la ricezione al mittente e di distruggerne il contenuto. L=
a informiamo inoltre che l'utilizzo non autorizzato del messaggio o dei suo=
i allegati potrebbe costituire reato. Grazie per la collaborazione.=20
=20
General Data Protection Regulation (GDPR) (EU) 2016/679,

E-mails from the Twe srl are sent in good faith but they are neither bindin=
g on the Twe srl nor to be understood as creating any obligation on its par=
t except where provided for in a written agreement. This e-mail is confiden=
tial. If you have received it by mistake, please inform the sender by reply=
 e-mail and delete it from your system. Please also note that the unauthori=
zed disclosure or use of the message or any attachments could be an offence=
. Thank you for your cooperation.

=20

=20

Da: Contact Fotoceramica <adipanfotoceramica@gmail.com>=20
Inviato: venerd=C3=AC 13 settembre 2024 16:20
A: c.nicolo@twesrl.it
Oggetto: info

=20

Hi,

=20

Do you have any idea on how I can make this address within the character li=
mits? What to put in the indirizzo and what to put in nr. civico?

=20

VIA F. PANZAROLA N.32, LOC. PONTE SAN GIOVANNI, PERUGIA
06126
PERUGIA
PERUGIA


------=_NextPart_000_00DD_01DB05FD.66966A40
Content-Type: text/html; charset="UTF-8"
Content-Transfer-Encoding: quoted-printable

<html xmlns:v=3D"urn:schemas-microsoft-com:vml" xmlns:o=3D"urn:schemas-micr=
osoft-com:office:office" xmlns:w=3D"urn:schemas-microsoft-com:office:word" =
xmlns:m=3D"http://schemas.microsoft.com/office/2004/12/omml" xmlns=3D"http:=
//www.w3.org/TR/REC-html40"><head><meta http-equiv=3DContent-Type content=
=3D"text/html; charset=3Dutf-8"><meta name=3DGenerator content=3D"Microsoft=
 Word 15 (filtered medium)"><style><!--
/* Font Definitions */
@font-face
=09{font-family:Helvetica;
=09panose-1:2 11 6 4 2 2 2 2 2 4;}
@font-face
=09{font-family:"Cambria Math";
=09panose-1:2 4 5 3 5 4 6 3 2 4;}
@font-face
=09{font-family:Calibri;
=09panose-1:2 15 5 2 2 2 4 3 2 4;}
/* Style Definitions */
p.MsoNormal, li.MsoNormal, div.MsoNormal
=09{margin:0cm;
=09font-size:11.0pt;
=09font-family:"Calibri",sans-serif;}
span.StileMessaggioDiPostaElettronica18
=09{mso-style-type:personal-reply;
=09font-family:"Calibri",sans-serif;
=09color:windowtext;}
.MsoChpDefault
=09{mso-style-type:export-only;
=09mso-fareast-language:EN-US;}
@page WordSection1
=09{size:612.0pt 792.0pt;
=09margin:70.85pt 2.0cm 2.0cm 2.0cm;}
div.WordSection1
=09{page:WordSection1;}
--></style><!--[if gte mso 9]><xml>
<o:shapedefaults v:ext=3D"edit" spidmax=3D"1026" />
</xml><![endif]--><!--[if gte mso 9]><xml>
<o:shapelayout v:ext=3D"edit">
<o:idmap v:ext=3D"edit" data=3D"1" />
</o:shapelayout></xml><![endif]--></head><body lang=3DIT link=3D"#0563C1" v=
link=3D"#954F72" style=3D'word-wrap:break-word'><div class=3DWordSection1><=
p class=3DMsoNormal><span style=3D'mso-fareast-language:EN-US'>ADDRESS: VIA=
 F. PANZAROLA 32<o:p></o:p></span></p><p class=3DMsoNormal><span style=3D'm=
so-fareast-language:EN-US'>CITY: PONTE SAN GIOVANNI<o:p></o:p></span></p><p=
 class=3DMsoNormal><span style=3D'mso-fareast-language:EN-US'>CAP: 06126<o:=
p></o:p></span></p><p class=3DMsoNormal><span style=3D'mso-fareast-language=
:EN-US'>PROVINCIA: PG<o:p></o:p></span></p><p class=3DMsoNormal><span style=
=3D'mso-fareast-language:EN-US'><o:p>&nbsp;</o:p></span></p><p class=3DMsoN=
ormal><span style=3D'mso-fareast-language:EN-US'>Bye!<o:p></o:p></span></p>=
<p class=3DMsoNormal><span style=3D'mso-fareast-language:EN-US'><o:p>&nbsp;=
</o:p></span></p><p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-=
margin-bottom-alt:auto'><b><i><span style=3D'font-size:12.0pt;font-family:"=
Arial",sans-serif;color:gray'>Nicol=C3=B2 Castiglioni =E2=80=93 Twe srl</sp=
an></i></b><span style=3D'font-size:12.0pt;font-family:"Times New Roman",se=
rif'><o:p></o:p></span></p><p class=3DMsoNormal style=3D'mso-margin-top-alt=
:auto;mso-margin-bottom-alt:auto'><span style=3D'font-size:9.0pt;font-famil=
y:"Arial",sans-serif;color:gray'>e-mail:=C2=A0 =C2=A0<a href=3D"mailto:c.ni=
colo@twesrl.it"><span style=3D'color:blue'>c.nicolo@twesrl.it</span></a></s=
pan><span style=3D'font-size:12.0pt;font-family:"Times New Roman",serif'><o=
:p></o:p></span></p><p class=3DMsoNormal><span style=3D'font-size:8.0pt;fon=
t-family:"Arial",sans-serif'>Ai sensi del General Data Protection Regulatio=
n (GDPR) (EU) 2016/679,<o:p></o:p></span></p><p class=3DMsoNormal><span sty=
le=3D'font-size:8.0pt;font-family:"Arial",sans-serif'>Le e-mail provenienti=
 dalla Twe srl sono trasmesse in buona fede e non comportano alcun vincolo =
ne' creano obblighi per la Twe srl stessa, salvo che cio' non sia espressam=
ente previsto da un accordo scritto. Questa e-mail e' confidenziale. Qualor=
a l'avesse ricevuta per errore, La preghiamo di comunicarne via e-mail la r=
icezione al mittente e di distruggerne il contenuto. La informiamo inoltre =
che l'utilizzo non autorizzato del messaggio o dei suoi allegati potrebbe c=
ostituire reato. </span><span lang=3DEN-GB style=3D'font-size:8.0pt;font-fa=
mily:"Arial",sans-serif'>Grazie per la collaborazione. <br>&nbsp;<br>Genera=
l Data Protection Regulation (GDPR) (EU) 2016/679,<o:p></o:p></span></p><p =
class=3DMsoNormal><span lang=3DEN-GB style=3D'font-size:8.0pt;font-family:"=
Arial",sans-serif'>E-mails from the Twe srl are sent in good faith but they=
 are neither binding on the Twe srl nor to be understood as creating any ob=
ligation on its part except where provided for in a written agreement. This=
 e-mail is confidential. If you have received it by mistake, please inform =
the sender by reply e-mail and delete it from your system. Please also note=
 that the unauthorized disclosure or use of the message or any attachments =
could be an offence. Thank you for your cooperation.<o:p></o:p></span></p><=
p class=3DMsoNormal><span style=3D'font-size:8.0pt;font-family:"Arial",sans=
-serif;color:navy'><o:p>&nbsp;</o:p></span></p><p class=3DMsoNormal><span s=
tyle=3D'mso-fareast-language:EN-US'><o:p>&nbsp;</o:p></span></p><div style=
=3D'border:none;border-top:solid #E1E1E1 1.0pt;padding:3.0pt 0cm 0cm 0cm'><=
p class=3DMsoNormal><b>Da:</b> Contact Fotoceramica &lt;adipanfotoceramica@=
gmail.com&gt; <br><b>Inviato:</b> venerd=C3=AC 13 settembre 2024 16:20<br><=
b>A:</b> c.nicolo@twesrl.it<br><b>Oggetto:</b> info<o:p></o:p></p></div><p =
class=3DMsoNormal><o:p>&nbsp;</o:p></p><div><p class=3DMsoNormal>Hi,<o:p></=
o:p></p><div><p class=3DMsoNormal><o:p>&nbsp;</o:p></p></div><div><p class=
=3DMsoNormal>Do you have any idea on how I can make this address within the=
 character limits? What to put in the indirizzo and what to put in nr. civi=
co?<o:p></o:p></p></div><div><p class=3DMsoNormal><o:p>&nbsp;</o:p></p></di=
v><div><p class=3DMsoNormal><i><span style=3D'font-size:10.5pt;font-family:=
"Helvetica",sans-serif;color:#4D4D4D'>VIA F. PANZAROLA N.32, LOC. PONTE SAN=
 GIOVANNI, PERUGIA<br>06126<br>PERUGIA<br>PERUGIA</span></i><o:p></o:p></p>=
</div></div></div></body></html>
------=_NextPart_000_00DD_01DB05FD.66966A40--`;

const message3 = `MIME-Version: 1.0
Date: Fri, 13 Sep 2024 18:07:40 +0300
References: <CAO_RwRvQ6oT+=p9QBCG-qHuUf8i7vxbnYHErGjd9af1DVPYqSg@mail.gmail.com> <00dc01db05ec$a30d9a40$e928cec0$@twesrl.it>
In-Reply-To: <00dc01db05ec$a30d9a40$e928cec0$@twesrl.it>
Message-ID: <CAO_RwRsGOf9MveZjLueXK3f6Bd-4xcqKT_MLM-BTcLZmBMz-vg@mail.gmail.com>
Subject: Re: info
From: Contact Fotoceramica <adipanfotoceramica@gmail.com>
To: c.nicolo@twesrl.it
Content-Type: multipart/mixed; boundary="0000000000009ea243062201956a"

--0000000000009ea243062201956a
Content-Type: multipart/alternative; boundary="0000000000009ea2420622019568"

--0000000000009ea2420622019568
Content-Type: text/plain; charset="UTF-8"
Content-Transfer-Encoding: quoted-printable

Thank you!

I'm attaching the shipment details. Could you please add a glue to box 4047=
?

Thank you!

=C3=8En vin., 13 sept. 2024 la 17:53, <c.nicolo@twesrl.it> a scris:

> ADDRESS: VIA F. PANZAROLA 32
>
> CITY: PONTE SAN GIOVANNI
>
> CAP: 06126
>
> PROVINCIA: PG
>
>
>
> Bye!
>
>
>
> *Nicol=C3=B2 Castiglioni =E2=80=93 Twe srl*
>
> e-mail:   c.nicolo@twesrl.it
>
> Ai sensi del General Data Protection Regulation (GDPR) (EU) 2016/679,
>
> Le e-mail provenienti dalla Twe srl sono trasmesse in buona fede e non
> comportano alcun vincolo ne' creano obblighi per la Twe srl stessa, salvo
> che cio' non sia espressamente previsto da un accordo scritto. Questa
> e-mail e' confidenziale. Qualora l'avesse ricevuta per errore, La preghia=
mo
> di comunicarne via e-mail la ricezione al mittente e di distruggerne il
> contenuto. La informiamo inoltre che l'utilizzo non autorizzato del
> messaggio o dei suoi allegati potrebbe costituire reato. Grazie per la
> collaborazione.
>
> General Data Protection Regulation (GDPR) (EU) 2016/679,
>
> E-mails from the Twe srl are sent in good faith but they are neither
> binding on the Twe srl nor to be understood as creating any obligation on
> its part except where provided for in a written agreement. This e-mail is
> confidential. If you have received it by mistake, please inform the sende=
r
> by reply e-mail and delete it from your system. Please also note that the
> unauthorized disclosure or use of the message or any attachments could be
> an offence. Thank you for your cooperation.
>
>
>
>
>
> *Da:* Contact Fotoceramica <adipanfotoceramica@gmail.com>
> *Inviato:* venerd=C3=AC 13 settembre 2024 16:20
> *A:* c.nicolo@twesrl.it
> *Oggetto:* info
>
>
>
> Hi,
>
>
>
> Do you have any idea on how I can make this address within the character
> limits? What to put in the indirizzo and what to put in nr. civico?
>
>
>
>
>
>
> *VIA F. PANZAROLA N.32, LOC. PONTE SAN GIOVANNI,
> PERUGIA06126PERUGIAPERUGIA*
>

--0000000000009ea2420622019568
Content-Type: text/html; charset="UTF-8"
Content-Transfer-Encoding: quoted-printable

<div dir=3D"ltr">Thank you!=C2=A0<div><br></div><div>I&#39;m attaching the =
shipment details. Could you please add a glue to box 4047?</div><div><br></=
div><div>Thank you!</div></div><br><div class=3D"gmail_quote"><div dir=3D"l=
tr" class=3D"gmail_attr">=C3=8En vin., 13 sept. 2024 la 17:53, &lt;<a href=
=3D"mailto:c.nicolo@twesrl.it">c.nicolo@twesrl.it</a>&gt; a scris:<br></div=
><blockquote class=3D"gmail_quote" style=3D"margin:0px 0px 0px 0.8ex;border=
-left:1px solid rgb(204,204,204);padding-left:1ex"><div class=3D"msg3227726=
712191090223"><div lang=3D"IT" style=3D"overflow-wrap: break-word;"><div cl=
ass=3D"m_3227726712191090223WordSection1"><p class=3D"MsoNormal"><span>ADDR=
ESS: VIA F. PANZAROLA 32<u></u><u></u></span></p><p class=3D"MsoNormal"><sp=
an>CITY: PONTE SAN GIOVANNI<u></u><u></u></span></p><p class=3D"MsoNormal">=
<span>CAP: 06126<u></u><u></u></span></p><p class=3D"MsoNormal"><span>PROVI=
NCIA: PG<u></u><u></u></span></p><p class=3D"MsoNormal"><span><u></u>=C2=A0=
<u></u></span></p><p class=3D"MsoNormal"><span>Bye!<u></u><u></u></span></p=
><p class=3D"MsoNormal"><span><u></u>=C2=A0<u></u></span></p><p class=3D"Ms=
oNormal"><b><i><span style=3D"font-size:12pt;font-family:Arial,sans-serif;c=
olor:gray">Nicol=C3=B2 Castiglioni =E2=80=93 Twe srl</span></i></b><span st=
yle=3D"font-size:12pt;font-family:&quot;Times New Roman&quot;,serif"><u></u=
><u></u></span></p><p class=3D"MsoNormal"><span style=3D"font-size:9pt;font=
-family:Arial,sans-serif;color:gray">e-mail:=C2=A0 =C2=A0<a href=3D"mailto:=
c.nicolo@twesrl.it" target=3D"_blank"><span style=3D"color:blue">c.nicolo@t=
wesrl.it</span></a></span><span style=3D"font-size:12pt;font-family:&quot;T=
imes New Roman&quot;,serif"><u></u><u></u></span></p><p class=3D"MsoNormal"=
><span style=3D"font-size:8pt;font-family:Arial,sans-serif">Ai sensi del Ge=
neral Data Protection Regulation (GDPR) (EU) 2016/679,<u></u><u></u></span>=
</p><p class=3D"MsoNormal"><span style=3D"font-size:8pt;font-family:Arial,s=
ans-serif">Le e-mail provenienti dalla Twe srl sono trasmesse in buona fede=
 e non comportano alcun vincolo ne&#39; creano obblighi per la Twe srl stes=
sa, salvo che cio&#39; non sia espressamente previsto da un accordo scritto=
. Questa e-mail e&#39; confidenziale. Qualora l&#39;avesse ricevuta per err=
ore, La preghiamo di comunicarne via e-mail la ricezione al mittente e di d=
istruggerne il contenuto. La informiamo inoltre che l&#39;utilizzo non auto=
rizzato del messaggio o dei suoi allegati potrebbe costituire reato. </span=
><span lang=3D"EN-GB" style=3D"font-size:8pt;font-family:Arial,sans-serif">=
Grazie per la collaborazione. <br>=C2=A0<br>General Data Protection Regulat=
ion (GDPR) (EU) 2016/679,<u></u><u></u></span></p><p class=3D"MsoNormal"><s=
pan lang=3D"EN-GB" style=3D"font-size:8pt;font-family:Arial,sans-serif">E-m=
ails from the Twe srl are sent in good faith but they are neither binding o=
n the Twe srl nor to be understood as creating any obligation on its part e=
xcept where provided for in a written agreement. This e-mail is confidentia=
l. If you have received it by mistake, please inform the sender by reply e-=
mail and delete it from your system. Please also note that the unauthorized=
 disclosure or use of the message or any attachments could be an offence. T=
hank you for your cooperation.<u></u><u></u></span></p><p class=3D"MsoNorma=
l"><span style=3D"font-size:8pt;font-family:Arial,sans-serif;color:navy"><u=
></u>=C2=A0<u></u></span></p><p class=3D"MsoNormal"><span><u></u>=C2=A0<u><=
/u></span></p><div style=3D"border-right:none;border-bottom:none;border-lef=
t:none;border-top:1pt solid rgb(225,225,225);padding:3pt 0cm 0cm"><p class=
=3D"MsoNormal"><b>Da:</b> Contact Fotoceramica &lt;<a href=3D"mailto:adipan=
fotoceramica@gmail.com" target=3D"_blank">adipanfotoceramica@gmail.com</a>&=
gt; <br><b>Inviato:</b> venerd=C3=AC 13 settembre 2024 16:20<br><b>A:</b> <=
a href=3D"mailto:c.nicolo@twesrl.it" target=3D"_blank">c.nicolo@twesrl.it</=
a><br><b>Oggetto:</b> info<u></u><u></u></p></div><p class=3D"MsoNormal"><u=
></u>=C2=A0<u></u></p><div><p class=3D"MsoNormal">Hi,<u></u><u></u></p><div=
><p class=3D"MsoNormal"><u></u>=C2=A0<u></u></p></div><div><p class=3D"MsoN=
ormal">Do you have any idea on how I can make this address within the chara=
cter limits? What to put in the indirizzo and what to put in nr. civico?<u>=
</u><u></u></p></div><div><p class=3D"MsoNormal"><u></u>=C2=A0<u></u></p></=
div><div><p class=3D"MsoNormal"><i><span style=3D"font-size:10.5pt;font-fam=
ily:Helvetica,sans-serif;color:rgb(77,77,77)">VIA F. PANZAROLA N.32, LOC. P=
ONTE SAN GIOVANNI, PERUGIA<br>06126<br>PERUGIA<br>PERUGIA</span></i><u></u>=
<u></u></p></div></div></div></div></div></blockquote></div>

--0000000000009ea2420622019568--
--0000000000009ea243062201956a
Content-Type: application/zip; name="Expeditii 13 sept. '24.zip"
Content-Disposition: attachment; filename="Expeditii 13 sept. '24.zip"
Content-Transfer-Encoding: base64
X-Attachment-Id: f_m10urbc20
Content-ID: <f_m10urbc20>


--0000000000009ea243062201956a--`;

const message4 = `Delivered-To: adipanfotoceramica@gmail.com
Received: by 2002:a54:2d0c:0:b0:270:20f9:92c6 with SMTP id i12csp1612990ecp;
        Fri, 13 Sep 2024 09:20:01 -0700 (PDT)
X-Google-Smtp-Source: AGHT+IFOoE6YqDW5/rqp+ADv1LPHiZnA6xJGQ/qeq40i5GHRRV4uZr60QKC2hGRF3c6FtT7SQw24
X-Received: by 2002:a5d:6948:0:b0:374:bde1:6dbc with SMTP id ffacd0b85a97d-378c2cfeccdmr4162783f8f.4.1726244400743;
        Fri, 13 Sep 2024 09:20:00 -0700 (PDT)
ARC-Seal: i=1; a=rsa-sha256; t=1726244400; cv=none;
        d=google.com; s=arc-20240605;
        b=C/zqKvYmhhRv5pyA50hOe3KXoRcdOUUd/sRJ3La1BIrqo/F2Zibhu/5ZnzBQnXdHYn
         QxMCFToiUWLuFQkiCNOv0mvKU4p2uKqGGrFln07T3G9Ps7h4VWg4jL5OtQIuuRqmaYx4
         UYB/NW5f9GemOOp/mP1jwvbk+kEtnc0aHgEZQ1RdeK4ERn3xAGi0+CfeNK9B+rI/JiO9
         /W0vY8f2WDjR/E2NLgzDAMRnHJlSBV8EX8y9eOnZqRepYj24jG/+MqMr5Ebtq30Xm71W
         WjWz5MvgQRgi2XC8V6N3jpuxD4s80IBOSc+CvOAGUEX6XSg5aM+G/fceO/IhSMVRf6YR
         NxwQ==
ARC-Message-Signature: i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20240605;
        h=content-language:thread-index:mime-version:message-id:date:subject
         :in-reply-to:references:to:from:dkim-signature;
        bh=cCV6WFq5gXgVhjrX5Dwa3ITZzouU023ETNA/TL+k1zM=;
        fh=kEPrwn4W4ptaoWl2Yqb/FY1FrvWp2aBAPELylHtvtgk=;
        b=k6jGi/NLo+DOJFcWkEquveoizVOcdqw0ejOfdKmuljn4f3tqzXkwcXJBpI93pmw5sB
         NJ/aZdpRmcqgHURsH3M4o+X+E7xrxkPEtBxJ64E/lUyes+aEIil96wT8RUEeRGIUMHr/
         vo3dPUhG+ZjvFlPudewHBrx2BlSA9+CsFFnNhhG6ilzsBtb6wd/00OJpOfeK2KGd/SDj
         tjLKKe3BkgkbseImeeg3BPzkEJdDAbd1qFzbO81mpjwFNCCYn2a1fXydjxk9J9u/4vQC
         d18Nfpx7Q4rFg1sH/TclRC7eiz/2B+9l7L0tOeadqlXEJ9oxypb2uazlk8vKd0GRvJi9
         VzYA==;
        dara=google.com
ARC-Authentication-Results: i=1; mx.google.com;
       dkim=pass header.i=@aruba.it header.s=a1 header.b=h1Aw2DMI;
       spf=pass (google.com: domain of c.nicolo@twesrl.it designates 62.149.158.149 as permitted sender) smtp.mailfrom=c.nicolo@twesrl.it;
       dmarc=pass (p=NONE sp=NONE dis=NONE) header.from=twesrl.it
Return-Path: <c.nicolo@twesrl.it>
Received: from smtpweb149.aruba.it (smtpweb149.aruba.it. [62.149.158.149])
        by mx.google.com with ESMTPS id 4fb4d7f45d1cf-5c3ebdb6bb8si10986180a12.640.2024.09.13.09.20.00
        for <adipanfotoceramica@gmail.com>
        (version=TLS1_2 cipher=ECDHE-ECDSA-AES128-GCM-SHA256 bits=128/128);
        Fri, 13 Sep 2024 09:20:00 -0700 (PDT)
Received-SPF: pass (google.com: domain of c.nicolo@twesrl.it designates 62.149.158.149 as permitted sender) client-ip=62.149.158.149;
Authentication-Results: mx.google.com;
       dkim=pass header.i=@aruba.it header.s=a1 header.b=h1Aw2DMI;
       spf=pass (google.com: domain of c.nicolo@twesrl.it designates 62.149.158.149 as permitted sender) smtp.mailfrom=c.nicolo@twesrl.it;
       dmarc=pass (p=NONE sp=NONE dis=NONE) header.from=twesrl.it
Received: from PCdiNicolo ([95.254.132.80]) by Aruba Outgoing Smtp
  with ESMTPA id p91csEJQwxmtup91cszdfw; Fri, 13 Sep 2024 18:20:00 +0200
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/simple; d=aruba.it; s=a1; t=1726244400; bh=gJVR+FWTYYIVBGNRhppQXrUzvDAhiwmtLvm/kJ/DaMc=; h=From:To:Subject:Date:MIME-Version:Content-Type; b=h1Aw2DMIwELtUhDl7fyGxOdsQjKOWv9q5XZu+mQEAGlRGymz1eAIZ6/5Mrs3qxp55
	 75btAY4B4crwDt+0c7GHg50SOzLcIPP7ym0RJfZe/824TnlCQDWcCTp3NclWwMygOn
	 co52OoBpLB6LkcrZOzfVgIgwfKtQ19W7imcZ4QMNuPSsFl9O+amRxMNUxA4VRRoOKO
	 1euoRckbXQpkccIaTwqs9NSkO83ajBL/pzEJZtu5J7sGp6BlQ6oh9aGVSONx5RPDlk
	 aFw02jJNTwP0Q/ToBIknAGnsLu2SDLZz0ukABX32kTm70PSWmd1rmXkRZVd810wJpT
	 +DkyFijZFILzg==
From: <c.nicolo@twesrl.it>
To: "'Contact Fotoceramica'" <adipanfotoceramica@gmail.com>
References: <CAO_RwRvQ6oT+=p9QBCG-qHuUf8i7vxbnYHErGjd9af1DVPYqSg@mail.gmail.com> <00dc01db05ec$a30d9a40$e928cec0$@twesrl.it> <CAO_RwRsGOf9MveZjLueXK3f6Bd-4xcqKT_MLM-BTcLZmBMz-vg@mail.gmail.com>
In-Reply-To: <CAO_RwRsGOf9MveZjLueXK3f6Bd-4xcqKT_MLM-BTcLZmBMz-vg@mail.gmail.com>
Subject: R: info
Date: Fri, 13 Sep 2024 18:20:00 +0200
Message-ID: <00ed01db05f8$c8177390$58465ab0$@twesrl.it>
MIME-Version: 1.0
Content-Type: multipart/alternative; boundary="----=_NextPart_000_00EE_01DB0609.8BA04390"
X-Mailer: Microsoft Outlook 16.0
Thread-Index: AQIRB+FNAJfajpvwLN3hkzD/7tZh5AGsdbxhAb5BQRixzowDoA==
Content-Language: it
X-CMAE-Envelope: MS4xfMgrv64Wp6RUN1vuvrfke+P/MDPbMhQrcQ5jEe7dKWdxDAY7Pbh21NrBQy4WWkz8SB1gnEQoUZpVyJqoY+Q5NZG2HlsPwYoA3GNWAQECGclzn3cBc4Gb k/5YfiMfVoAkdNhgcL9J7PZw92mck/S5HggCUJhDkz4VAeNvxwjEa/9uG1mRWPHvHlejdf1JNIBMHA==

------=_NextPart_000_00EE_01DB0609.8BA04390
Content-Type: text/plain; charset="UTF-8"
Content-Transfer-Encoding: quoted-printable

Hi,

shipment leave today, ok for glue in 4047.

=20

Bye

Nicol=C3=B2 Castiglioni =E2=80=93 Twe srl

e-mail:   c.nicolo@twesrl.it <mailto:c.nicolo@twesrl.it>=20

Ai sensi del General Data Protection Regulation (GDPR) (EU) 2016/679,

Le e-mail provenienti dalla Twe srl sono trasmesse in buona fede e non comp=
ortano alcun vincolo ne' creano obblighi per la Twe srl stessa, salvo che c=
io' non sia espressamente previsto da un accordo scritto. Questa e-mail e' =
confidenziale. Qualora l'avesse ricevuta per errore, La preghiamo di comuni=
carne via e-mail la ricezione al mittente e di distruggerne il contenuto. L=
a informiamo inoltre che l'utilizzo non autorizzato del messaggio o dei suo=
i allegati potrebbe costituire reato. Grazie per la collaborazione.=20
=20
General Data Protection Regulation (GDPR) (EU) 2016/679,

E-mails from the Twe srl are sent in good faith but they are neither bindin=
g on the Twe srl nor to be understood as creating any obligation on its par=
t except where provided for in a written agreement. This e-mail is confiden=
tial. If you have received it by mistake, please inform the sender by reply=
 e-mail and delete it from your system. Please also note that the unauthori=
zed disclosure or use of the message or any attachments could be an offence=
. Thank you for your cooperation.

=20

=20

Da: Contact Fotoceramica <adipanfotoceramica@gmail.com>=20
Inviato: venerd=C3=AC 13 settembre 2024 17:08
A: c.nicolo@twesrl.it
Oggetto: Re: info

=20

Thank you!=20

=20

I'm attaching the shipment details. Could you please add a glue to box 4047=
?

=20

Thank you!

=20

=C3=8En vin., 13 sept. 2024 la 17:53, <c.nicolo@twesrl.it <mailto:c.nicolo@=
twesrl.it> > a scris:

ADDRESS: VIA F. PANZAROLA 32

CITY: PONTE SAN GIOVANNI

CAP: 06126

PROVINCIA: PG

=20

Bye!

=20

Nicol=C3=B2 Castiglioni =E2=80=93 Twe srl

e-mail:   c.nicolo@twesrl.it <mailto:c.nicolo@twesrl.it>=20

Ai sensi del General Data Protection Regulation (GDPR) (EU) 2016/679,

Le e-mail provenienti dalla Twe srl sono trasmesse in buona fede e non comp=
ortano alcun vincolo ne' creano obblighi per la Twe srl stessa, salvo che c=
io' non sia espressamente previsto da un accordo scritto. Questa e-mail e' =
confidenziale. Qualora l'avesse ricevuta per errore, La preghiamo di comuni=
carne via e-mail la ricezione al mittente e di distruggerne il contenuto. L=
a informiamo inoltre che l'utilizzo non autorizzato del messaggio o dei suo=
i allegati potrebbe costituire reato. Grazie per la collaborazione.=20
=20
General Data Protection Regulation (GDPR) (EU) 2016/679,

E-mails from the Twe srl are sent in good faith but they are neither bindin=
g on the Twe srl nor to be understood as creating any obligation on its par=
t except where provided for in a written agreement. This e-mail is confiden=
tial. If you have received it by mistake, please inform the sender by reply=
 e-mail and delete it from your system. Please also note that the unauthori=
zed disclosure or use of the message or any attachments could be an offence=
. Thank you for your cooperation.

=20

=20

Da: Contact Fotoceramica <adipanfotoceramica@gmail.com <mailto:adipanfotoce=
ramica@gmail.com> >=20
Inviato: venerd=C3=AC 13 settembre 2024 16:20
A: c.nicolo@twesrl.it <mailto:c.nicolo@twesrl.it>=20
Oggetto: info

=20

Hi,

=20

Do you have any idea on how I can make this address within the character li=
mits? What to put in the indirizzo and what to put in nr. civico?

=20

VIA F. PANZAROLA N.32, LOC. PONTE SAN GIOVANNI, PERUGIA
06126
PERUGIA
PERUGIA


------=_NextPart_000_00EE_01DB0609.8BA04390
Content-Type: text/html; charset="UTF-8"
Content-Transfer-Encoding: quoted-printable

<html xmlns:v=3D"urn:schemas-microsoft-com:vml" xmlns:o=3D"urn:schemas-micr=
osoft-com:office:office" xmlns:w=3D"urn:schemas-microsoft-com:office:word" =
xmlns:m=3D"http://schemas.microsoft.com/office/2004/12/omml" xmlns=3D"http:=
//www.w3.org/TR/REC-html40"><head><meta http-equiv=3DContent-Type content=
=3D"text/html; charset=3Dutf-8"><meta name=3DGenerator content=3D"Microsoft=
 Word 15 (filtered medium)"><style><!--
/* Font Definitions */
@font-face
=09{font-family:Helvetica;
=09panose-1:2 11 6 4 2 2 2 2 2 4;}
@font-face
=09{font-family:"Cambria Math";
=09panose-1:2 4 5 3 5 4 6 3 2 4;}
@font-face
=09{font-family:Calibri;
=09panose-1:2 15 5 2 2 2 4 3 2 4;}
/* Style Definitions */
p.MsoNormal, li.MsoNormal, div.MsoNormal
=09{margin:0cm;
=09font-size:11.0pt;
=09font-family:"Calibri",sans-serif;}
a:link, span.MsoHyperlink
=09{mso-style-priority:99;
=09color:blue;
=09text-decoration:underline;}
span.StileMessaggioDiPostaElettronica18
=09{mso-style-type:personal-reply;
=09font-family:"Calibri",sans-serif;
=09color:windowtext;}
.MsoChpDefault
=09{mso-style-type:export-only;
=09mso-fareast-language:EN-US;}
@page WordSection1
=09{size:612.0pt 792.0pt;
=09margin:70.85pt 2.0cm 2.0cm 2.0cm;}
div.WordSection1
=09{page:WordSection1;}
--></style><!--[if gte mso 9]><xml>
<o:shapedefaults v:ext=3D"edit" spidmax=3D"1026" />
</xml><![endif]--><!--[if gte mso 9]><xml>
<o:shapelayout v:ext=3D"edit">
<o:idmap v:ext=3D"edit" data=3D"1" />
</o:shapelayout></xml><![endif]--></head><body lang=3DIT link=3Dblue vlink=
=3Dpurple style=3D'word-wrap:break-word'><div class=3DWordSection1><p class=
=3DMsoNormal><span style=3D'mso-fareast-language:EN-US'>Hi,<o:p></o:p></spa=
n></p><p class=3DMsoNormal><span style=3D'mso-fareast-language:EN-US'>shipm=
ent leave today, ok for glue in 4047.<o:p></o:p></span></p><p class=3DMsoNo=
rmal><span style=3D'mso-fareast-language:EN-US'><o:p>&nbsp;</o:p></span></p=
><p class=3DMsoNormal><span style=3D'mso-fareast-language:EN-US'>Bye<o:p></=
o:p></span></p><p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-ma=
rgin-bottom-alt:auto'><b><i><span style=3D'font-size:12.0pt;font-family:"Ar=
ial",sans-serif;color:gray'>Nicol=C3=B2 Castiglioni =E2=80=93 Twe srl</span=
></i></b><span style=3D'font-size:12.0pt;font-family:"Times New Roman",seri=
f'><o:p></o:p></span></p><p class=3DMsoNormal style=3D'mso-margin-top-alt:a=
uto;mso-margin-bottom-alt:auto'><span style=3D'font-size:9.0pt;font-family:=
"Arial",sans-serif;color:gray'>e-mail:=C2=A0 =C2=A0<a href=3D"mailto:c.nico=
lo@twesrl.it">c.nicolo@twesrl.it</a></span><span style=3D'font-size:12.0pt;=
font-family:"Times New Roman",serif'><o:p></o:p></span></p><p class=3DMsoNo=
rmal><span style=3D'font-size:8.0pt;font-family:"Arial",sans-serif'>Ai sens=
i del General Data Protection Regulation (GDPR) (EU) 2016/679,<o:p></o:p></=
span></p><p class=3DMsoNormal><span style=3D'font-size:8.0pt;font-family:"A=
rial",sans-serif'>Le e-mail provenienti dalla Twe srl sono trasmesse in buo=
na fede e non comportano alcun vincolo ne' creano obblighi per la Twe srl s=
tessa, salvo che cio' non sia espressamente previsto da un accordo scritto.=
 Questa e-mail e' confidenziale. Qualora l'avesse ricevuta per errore, La p=
reghiamo di comunicarne via e-mail la ricezione al mittente e di distrugger=
ne il contenuto. La informiamo inoltre che l'utilizzo non autorizzato del m=
essaggio o dei suoi allegati potrebbe costituire reato. </span><span lang=
=3DEN-GB style=3D'font-size:8.0pt;font-family:"Arial",sans-serif'>Grazie pe=
r la collaborazione. <br>&nbsp;<br>General Data Protection Regulation (GDPR=
) (EU) 2016/679,<o:p></o:p></span></p><p class=3DMsoNormal><span lang=3DEN-=
GB style=3D'font-size:8.0pt;font-family:"Arial",sans-serif'>E-mails from th=
e Twe srl are sent in good faith but they are neither binding on the Twe sr=
l nor to be understood as creating any obligation on its part except where =
provided for in a written agreement. This e-mail is confidential. If you ha=
ve received it by mistake, please inform the sender by reply e-mail and del=
ete it from your system. Please also note that the unauthorized disclosure =
or use of the message or any attachments could be an offence. Thank you for=
 your cooperation.<o:p></o:p></span></p><p class=3DMsoNormal><span style=3D=
'font-size:8.0pt;font-family:"Arial",sans-serif;color:navy'><o:p>&nbsp;</o:=
p></span></p><p class=3DMsoNormal><span style=3D'mso-fareast-language:EN-US=
'><o:p>&nbsp;</o:p></span></p><div style=3D'border:none;border-top:solid #E=
1E1E1 1.0pt;padding:3.0pt 0cm 0cm 0cm'><p class=3DMsoNormal><b>Da:</b> Cont=
act Fotoceramica &lt;adipanfotoceramica@gmail.com&gt; <br><b>Inviato:</b> v=
enerd=C3=AC 13 settembre 2024 17:08<br><b>A:</b> c.nicolo@twesrl.it<br><b>O=
ggetto:</b> Re: info<o:p></o:p></p></div><p class=3DMsoNormal><o:p>&nbsp;</=
o:p></p><div><p class=3DMsoNormal>Thank you!&nbsp;<o:p></o:p></p><div><p cl=
ass=3DMsoNormal><o:p>&nbsp;</o:p></p></div><div><p class=3DMsoNormal>I'm at=
taching the shipment details. Could you please add a glue to box 4047?<o:p>=
</o:p></p></div><div><p class=3DMsoNormal><o:p>&nbsp;</o:p></p></div><div><=
p class=3DMsoNormal>Thank you!<o:p></o:p></p></div></div><p class=3DMsoNorm=
al><o:p>&nbsp;</o:p></p><div><div><p class=3DMsoNormal>=C3=8En vin., 13 sep=
t. 2024 la 17:53, &lt;<a href=3D"mailto:c.nicolo@twesrl.it">c.nicolo@twesrl=
.it</a>&gt; a scris:<o:p></o:p></p></div><blockquote style=3D'border:none;b=
order-left:solid #CCCCCC 1.0pt;padding:0cm 0cm 0cm 6.0pt;margin-left:4.8pt;=
margin-right:0cm'><div><div><div><p class=3DMsoNormal style=3D'mso-margin-t=
op-alt:auto;mso-margin-bottom-alt:auto'>ADDRESS: VIA F. PANZAROLA 32<o:p></=
o:p></p><p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-margin-bo=
ttom-alt:auto'>CITY: PONTE SAN GIOVANNI<o:p></o:p></p><p class=3DMsoNormal =
style=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto'>CAP: 06126<o:p=
></o:p></p><p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-margin=
-bottom-alt:auto'>PROVINCIA: PG<o:p></o:p></p><p class=3DMsoNormal style=3D=
'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto'>&nbsp;<o:p></o:p></p><=
p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:=
auto'>Bye!<o:p></o:p></p><p class=3DMsoNormal style=3D'mso-margin-top-alt:a=
uto;mso-margin-bottom-alt:auto'>&nbsp;<o:p></o:p></p><p class=3DMsoNormal s=
tyle=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto'><b><i><span sty=
le=3D'font-size:12.0pt;font-family:"Arial",sans-serif;color:gray'>Nicol=C3=
=B2 Castiglioni =E2=80=93 Twe srl</span></i></b><o:p></o:p></p><p class=3DM=
soNormal style=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto'><span=
 style=3D'font-size:9.0pt;font-family:"Arial",sans-serif;color:gray'>e-mail=
:&nbsp; &nbsp;<a href=3D"mailto:c.nicolo@twesrl.it" target=3D"_blank">c.nic=
olo@twesrl.it</a></span><o:p></o:p></p><p class=3DMsoNormal style=3D'mso-ma=
rgin-top-alt:auto;mso-margin-bottom-alt:auto'><span style=3D'font-size:8.0p=
t;font-family:"Arial",sans-serif'>Ai sensi del General Data Protection Regu=
lation (GDPR) (EU) 2016/679,</span><o:p></o:p></p><p class=3DMsoNormal styl=
e=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto'><span style=3D'fon=
t-size:8.0pt;font-family:"Arial",sans-serif'>Le e-mail provenienti dalla Tw=
e srl sono trasmesse in buona fede e non comportano alcun vincolo ne' crean=
o obblighi per la Twe srl stessa, salvo che cio' non sia espressamente prev=
isto da un accordo scritto. Questa e-mail e' confidenziale. Qualora l'avess=
e ricevuta per errore, La preghiamo di comunicarne via e-mail la ricezione =
al mittente e di distruggerne il contenuto. La informiamo inoltre che l'uti=
lizzo non autorizzato del messaggio o dei suoi allegati potrebbe costituire=
 reato. </span><span lang=3DEN-GB style=3D'font-size:8.0pt;font-family:"Ari=
al",sans-serif'>Grazie per la collaborazione. <br>&nbsp;<br>General Data Pr=
otection Regulation (GDPR) (EU) 2016/679,</span><o:p></o:p></p><p class=3DM=
soNormal style=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto'><span=
 lang=3DEN-GB style=3D'font-size:8.0pt;font-family:"Arial",sans-serif'>E-ma=
ils from the Twe srl are sent in good faith but they are neither binding on=
 the Twe srl nor to be understood as creating any obligation on its part ex=
cept where provided for in a written agreement. This e-mail is confidential=
. If you have received it by mistake, please inform the sender by reply e-m=
ail and delete it from your system. Please also note that the unauthorized =
disclosure or use of the message or any attachments could be an offence. Th=
ank you for your cooperation.</span><o:p></o:p></p><p class=3DMsoNormal sty=
le=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto'><span style=3D'fo=
nt-size:8.0pt;font-family:"Arial",sans-serif;color:navy'>&nbsp;</span><o:p>=
</o:p></p><p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-margin-=
bottom-alt:auto'>&nbsp;<o:p></o:p></p><div style=3D'border:none;border-top:=
solid #E1E1E1 1.0pt;padding:3.0pt 0cm 0cm 0cm'><p class=3DMsoNormal style=
=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto'><b>Da:</b> Contact =
Fotoceramica &lt;<a href=3D"mailto:adipanfotoceramica@gmail.com" target=3D"=
_blank">adipanfotoceramica@gmail.com</a>&gt; <br><b>Inviato:</b> venerd=C3=
=AC 13 settembre 2024 16:20<br><b>A:</b> <a href=3D"mailto:c.nicolo@twesrl.=
it" target=3D"_blank">c.nicolo@twesrl.it</a><br><b>Oggetto:</b> info<o:p></=
o:p></p></div><p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-mar=
gin-bottom-alt:auto'>&nbsp;<o:p></o:p></p><div><p class=3DMsoNormal style=
=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto'>Hi,<o:p></o:p></p><=
div><p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-margin-bottom=
-alt:auto'>&nbsp;<o:p></o:p></p></div><div><p class=3DMsoNormal style=3D'ms=
o-margin-top-alt:auto;mso-margin-bottom-alt:auto'>Do you have any idea on h=
ow I can make this address within the character limits? What to put in the =
indirizzo and what to put in nr. civico?<o:p></o:p></p></div><div><p class=
=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto'>&=
nbsp;<o:p></o:p></p></div><div><p class=3DMsoNormal style=3D'mso-margin-top=
-alt:auto;mso-margin-bottom-alt:auto'><i><span style=3D'font-size:10.5pt;fo=
nt-family:"Helvetica",sans-serif;color:#4D4D4D'>VIA F. PANZAROLA N.32, LOC.=
 PONTE SAN GIOVANNI, PERUGIA<br>06126<br>PERUGIA<br>PERUGIA</span></i><o:p>=
</o:p></p></div></div></div></div></div></blockquote></div></div></body></h=
tml>
------=_NextPart_000_00EE_01DB0609.8BA04390--`;

const message5 = `Delivered-To: adipanfotoceramica@gmail.com
Received: by 2002:a05:6400:2c7:b0:270:20f9:92c6 with SMTP id hz7csp67307ecb;
        Tue, 17 Sep 2024 01:52:09 -0700 (PDT)
X-Google-Smtp-Source: AGHT+IHbgULfMQQX/whsOiJ9Px+cYm6E48hM21y8Gk1KeGQtvV/ehuJ2ULKT801B+iZoSaOGnZP4
X-Received: by 2002:a50:c907:0:b0:5c3:cd68:5702 with SMTP id 4fb4d7f45d1cf-5c41e2b4162mr7675973a12.36.1726563129637;
        Tue, 17 Sep 2024 01:52:09 -0700 (PDT)
ARC-Seal: i=1; a=rsa-sha256; t=1726563129; cv=none;
        d=google.com; s=arc-20240605;
        b=hDbfQSy4j3Odx5Msyo1FJyneZXP55VAMzLnQkGzkOVElnNV9OLrIc5Jz20osrWs287
         OsUFsj+EsamAy5MyXFtBwWuS+zrgeHvQLWAHVijv1BZGgCMhv11twBYHMniSOf0usjAt
         /S+EMjedtFngPC7Y8VKHasRTow1ZK20F1arY05+68+rG//cCALkalv1RLmcLNJ9wY7+y
         lADgyeLGJULdaAOO+T90kVP8HQzncxtyX0tDAsDzQG8aj1HQrVzMlv+TaALBUuxFssvf
         xcy5Woev5n+TyhqLxeXfasH8AnACOJ8LZxkLkbJIBC/R+PaQZ8nnP/fLqxLGAqBHEP0d
         3Q1Q==
ARC-Message-Signature: i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20240605;
        h=thread-index:content-language:mime-version:message-id:date:subject
         :in-reply-to:references:to:from:dkim-signature;
        bh=FtA2u6uqbUOLVgqjyUfIu/ISf41+Tb9BH7bczCokXE0=;
        fh=kEPrwn4W4ptaoWl2Yqb/FY1FrvWp2aBAPELylHtvtgk=;
        b=KLkHevQ0RD4tb6udqjHtk2UNvV8xbjiNUW6Sy0/zg7FR8SARullmfySlh/jEAYN7t8
         Fn8IXKolY+JFrtjgfaAkgFOfmOkD32wuNc4WS7xwrshMLwRRClUG46o7b3O5Q7k1F4le
         DY2CN7BSywLU0CaMyzlZIzaBE/75sanI5JTAA4XpbQ5LamuO6DmRZyr5jTBeh7dAUSdw
         CB2Uge5Im9lgHIO9yJkTsSiR5vgFgypEMavEYpcET7fa6VEHODrQgiU2ViRmObDcYTSx
         SyF7MmzFRK/To2RkiJjibJvcPEh6JTk6OeANplxNK9+7TDnMBgaXv/gPZM3E576GE62z
         d8bA==;
        dara=google.com
ARC-Authentication-Results: i=1; mx.google.com;
       dkim=pass header.i=@aruba.it header.s=a1 header.b=dAP5sRW5;
       spf=pass (google.com: domain of c.nicolo@twesrl.it designates 62.149.158.133 as permitted sender) smtp.mailfrom=c.nicolo@twesrl.it;
       dmarc=pass (p=NONE sp=NONE dis=NONE) header.from=twesrl.it
Return-Path: <c.nicolo@twesrl.it>
Received: from smtpcmd04133.aruba.it (smtpcmd04133.aruba.it. [62.149.158.133])
        by mx.google.com with ESMTPS id 4fb4d7f45d1cf-5c42bc90306si4875855a12.375.2024.09.17.01.52.09
        for <adipanfotoceramica@gmail.com>
        (version=TLS1_2 cipher=ECDHE-ECDSA-AES128-GCM-SHA256 bits=128/128);
        Tue, 17 Sep 2024 01:52:09 -0700 (PDT)
Received-SPF: pass (google.com: domain of c.nicolo@twesrl.it designates 62.149.158.133 as permitted sender) client-ip=62.149.158.133;
Authentication-Results: mx.google.com;
       dkim=pass header.i=@aruba.it header.s=a1 header.b=dAP5sRW5;
       spf=pass (google.com: domain of c.nicolo@twesrl.it designates 62.149.158.133 as permitted sender) smtp.mailfrom=c.nicolo@twesrl.it;
       dmarc=pass (p=NONE sp=NONE dis=NONE) header.from=twesrl.it
Received: from PCdiNicolo ([95.254.132.80]) by Aruba Outgoing Smtp
  with ESMTPA id qTwPsoGC7DrVnqTwPsSL2V; Tue, 17 Sep 2024 10:52:09 +0200
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/simple; d=aruba.it; s=a1; t=1726563129; bh=VyVY5q4iyvmFa7cLQyXI5UpR2IBic+fwsKUnoQc+1jo=; h=From:To:Subject:Date:MIME-Version:Content-Type; b=dAP5sRW5lgQe4Uuir4E7etfXf7gcY1W+Z3+Ww9SXI4ZK51oXNdEJVHtBIxxPYEtqI
	 40xF692fh/NN5yaOtiGICv6nWBFmfRGP/R/3xnGOZ5Xdf2tN/BTbWlkwiM/0rMeJMa
	 iAlxpIo5NWIsjFhpDsUMwnvye1QwWXyYmPlcQr2OCBEFRO6VLZuCv7RkdJg1DSWX/U
	 3dAAaJoRWVrKpfUUlbKLy1b+P9plyDa3aj04iz+VPiKkQ9MfpyiFY+lR3jK/FzMsyH
	 bGEQZMHSzHOBJ3HQvUgY1TOfPZTfpbO39/h7w0j82NkVVaYReXc6jiobRBjiuitFAK
	 Z9F+7t7Vc/hrQ==
From: <c.nicolo@twesrl.it>
To: "'Contact Fotoceramica'" <adipanfotoceramica@gmail.com>
References: <CAO_RwRvQ6oT+=p9QBCG-qHuUf8i7vxbnYHErGjd9af1DVPYqSg@mail.gmail.com> <00dc01db05ec$a30d9a40$e928cec0$@twesrl.it> <CAO_RwRsGOf9MveZjLueXK3f6Bd-4xcqKT_MLM-BTcLZmBMz-vg@mail.gmail.com>
In-Reply-To: <CAO_RwRsGOf9MveZjLueXK3f6Bd-4xcqKT_MLM-BTcLZmBMz-vg@mail.gmail.com>
Subject: R: info
Date: Tue, 17 Sep 2024 10:52:09 +0200
Message-ID: <004901db08de$e1c15f70$a5441e50$@twesrl.it>
MIME-Version: 1.0
Content-Type: multipart/alternative; boundary="----=_NextPart_000_004A_01DB08EF.A54CA070"
X-Mailer: Microsoft Outlook 16.0
Content-Language: it
Thread-Index: AQIRB+FNAJfajpvwLN3hkzD/7tZh5AGsdbxhAb5BQRix1FgwsA==
X-CMAE-Envelope: MS4xfD67cCOmW5ntsUUsAXRA4+GSVs0yuJQZEAiG8c8WgFvXjaf9eehTSfYUZKGMnGlGV7WZcD7veAG+yl7Jwj/3JeSDfRce0R6Dqfz/TwjxhhkANF9qepBy ZfDWCFOR3FkfFnJXLbYsDCxZTIgAM/GOtR6fmPWvwe1eZB96sk9nTXOk/1kBEb3Giqbf6Jb/jgYs7Q==

------=_NextPart_000_004A_01DB08EF.A54CA070
Content-Type: text/plain; charset="utf-8"
Content-Transfer-Encoding: quoted-printable

Hi,

we have n. 4116 since 2 weeks in storage.

How do we go on?

=20

Bye

Nicol=C3=B2 Castiglioni =E2=80=93 Twe srl

e-mail:   c.nicolo@twesrl.it <mailto:c.nicolo@twesrl.it>=20

Ai sensi del General Data Protection Regulation (GDPR) (EU) 2016/679,

Le e-mail provenienti dalla Twe srl sono trasmesse in buona fede e non comp=
ortano alcun vincolo ne' creano obblighi per la Twe srl stessa, salvo che c=
io' non sia espressamente previsto da un accordo scritto. Questa e-mail e' =
confidenziale. Qualora l'avesse ricevuta per errore, La preghiamo di comuni=
carne via e-mail la ricezione al mittente e di distruggerne il contenuto. L=
a informiamo inoltre che l'utilizzo non autorizzato del messaggio o dei suo=
i allegati potrebbe costituire reato. Grazie per la collaborazione.=20
=20
General Data Protection Regulation (GDPR) (EU) 2016/679,

E-mails from the Twe srl are sent in good faith but they are neither bindin=
g on the Twe srl nor to be understood as creating any obligation on its par=
t except where provided for in a written agreement. This e-mail is confiden=
tial. If you have received it by mistake, please inform the sender by reply=
 e-mail and delete it from your system. Please also note that the unauthori=
zed disclosure or use of the message or any attachments could be an offence=
. Thank you for your cooperation.

=20

=20

Da: Contact Fotoceramica <adipanfotoceramica@gmail.com>=20
Inviato: venerd=C3=AC 13 settembre 2024 17:08
A: c.nicolo@twesrl.it
Oggetto: Re: info

=20

Thank you!=20

=20

I'm attaching the shipment details. Could you please add a glue to box 4047=
?

=20

Thank you!

=20

=C3=8En vin., 13 sept. 2024 la 17:53, <c.nicolo@twesrl.it <mailto:c.nicolo@=
twesrl.it> > a scris:

ADDRESS: VIA F. PANZAROLA 32

CITY: PONTE SAN GIOVANNI

CAP: 06126

PROVINCIA: PG

=20

Bye!

=20

Nicol=C3=B2 Castiglioni =E2=80=93 Twe srl

e-mail:   c.nicolo@twesrl.it <mailto:c.nicolo@twesrl.it>=20

Ai sensi del General Data Protection Regulation (GDPR) (EU) 2016/679,

Le e-mail provenienti dalla Twe srl sono trasmesse in buona fede e non comp=
ortano alcun vincolo ne' creano obblighi per la Twe srl stessa, salvo che c=
io' non sia espressamente previsto da un accordo scritto. Questa e-mail e' =
confidenziale. Qualora l'avesse ricevuta per errore, La preghiamo di comuni=
carne via e-mail la ricezione al mittente e di distruggerne il contenuto. L=
a informiamo inoltre che l'utilizzo non autorizzato del messaggio o dei suo=
i allegati potrebbe costituire reato. Grazie per la collaborazione.=20
=20
General Data Protection Regulation (GDPR) (EU) 2016/679,

E-mails from the Twe srl are sent in good faith but they are neither bindin=
g on the Twe srl nor to be understood as creating any obligation on its par=
t except where provided for in a written agreement. This e-mail is confiden=
tial. If you have received it by mistake, please inform the sender by reply=
 e-mail and delete it from your system. Please also note that the unauthori=
zed disclosure or use of the message or any attachments could be an offence=
. Thank you for your cooperation.

=20

=20

Da: Contact Fotoceramica <adipanfotoceramica@gmail.com <mailto:adipanfotoce=
ramica@gmail.com> >=20
Inviato: venerd=C3=AC 13 settembre 2024 16:20
A: c.nicolo@twesrl.it <mailto:c.nicolo@twesrl.it>=20
Oggetto: info

=20

Hi,

=20

Do you have any idea on how I can make this address within the character li=
mits? What to put in the indirizzo and what to put in nr. civico?

=20

VIA F. PANZAROLA N.32, LOC. PONTE SAN GIOVANNI, PERUGIA
06126
PERUGIA
PERUGIA


------=_NextPart_000_004A_01DB08EF.A54CA070
Content-Type: text/html; charset="utf-8"
Content-Transfer-Encoding: quoted-printable

<html xmlns:v=3D"urn:schemas-microsoft-com:vml" xmlns:o=3D"urn:schemas-micr=
osoft-com:office:office" xmlns:w=3D"urn:schemas-microsoft-com:office:word" =
xmlns:m=3D"http://schemas.microsoft.com/office/2004/12/omml" xmlns=3D"http:=
//www.w3.org/TR/REC-html40"><head><meta http-equiv=3DContent-Type content=
=3D"text/html; charset=3Dutf-8"><meta name=3DGenerator content=3D"Microsoft=
 Word 15 (filtered medium)"><style><!--
/* Font Definitions */
@font-face
=09{font-family:Helvetica;
=09panose-1:2 11 6 4 2 2 2 2 2 4;}
@font-face
=09{font-family:"Cambria Math";
=09panose-1:2 4 5 3 5 4 6 3 2 4;}
@font-face
=09{font-family:Calibri;
=09panose-1:2 15 5 2 2 2 4 3 2 4;}
/* Style Definitions */
p.MsoNormal, li.MsoNormal, div.MsoNormal
=09{margin:0cm;
=09font-size:11.0pt;
=09font-family:"Calibri",sans-serif;}
a:link, span.MsoHyperlink
=09{mso-style-priority:99;
=09color:blue;
=09text-decoration:underline;}
span.StileMessaggioDiPostaElettronica18
=09{mso-style-type:personal-reply;
=09font-family:"Calibri",sans-serif;
=09color:windowtext;}
.MsoChpDefault
=09{mso-style-type:export-only;
=09mso-fareast-language:EN-US;}
@page WordSection1
=09{size:612.0pt 792.0pt;
=09margin:70.85pt 2.0cm 2.0cm 2.0cm;}
div.WordSection1
=09{page:WordSection1;}
--></style><!--[if gte mso 9]><xml>
<o:shapedefaults v:ext=3D"edit" spidmax=3D"1026" />
</xml><![endif]--><!--[if gte mso 9]><xml>
<o:shapelayout v:ext=3D"edit">
<o:idmap v:ext=3D"edit" data=3D"1" />
</o:shapelayout></xml><![endif]--></head><body lang=3DIT link=3Dblue vlink=
=3Dpurple style=3D'word-wrap:break-word'><div class=3DWordSection1><p class=
=3DMsoNormal><span style=3D'mso-fareast-language:EN-US'>Hi,<o:p></o:p></spa=
n></p><p class=3DMsoNormal><span style=3D'mso-fareast-language:EN-US'>we ha=
ve n. 4116 since 2 weeks in storage.<o:p></o:p></span></p><p class=3DMsoNor=
mal><span style=3D'mso-fareast-language:EN-US'>How do we go on?<o:p></o:p><=
/span></p><p class=3DMsoNormal><span style=3D'mso-fareast-language:EN-US'><=
o:p>&nbsp;</o:p></span></p><p class=3DMsoNormal><span style=3D'mso-fareast-=
language:EN-US'>Bye<o:p></o:p></span></p><p class=3DMsoNormal style=3D'mso-=
margin-top-alt:auto;mso-margin-bottom-alt:auto'><b><i><span style=3D'font-s=
ize:12.0pt;font-family:"Arial",sans-serif;color:gray'>Nicol=C3=B2 Castiglio=
ni =E2=80=93 Twe srl</span></i></b><span style=3D'font-size:12.0pt;font-fam=
ily:"Times New Roman",serif'><o:p></o:p></span></p><p class=3DMsoNormal sty=
le=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto'><span style=3D'fo=
nt-size:9.0pt;font-family:"Arial",sans-serif;color:gray'>e-mail:=C2=A0 =C2=
=A0<a href=3D"mailto:c.nicolo@twesrl.it">c.nicolo@twesrl.it</a></span><span=
 style=3D'font-size:12.0pt;font-family:"Times New Roman",serif'><o:p></o:p>=
</span></p><p class=3DMsoNormal><span style=3D'font-size:8.0pt;font-family:=
"Arial",sans-serif'>Ai sensi del General Data Protection Regulation (GDPR) =
(EU) 2016/679,<o:p></o:p></span></p><p class=3DMsoNormal><span style=3D'fon=
t-size:8.0pt;font-family:"Arial",sans-serif'>Le e-mail provenienti dalla Tw=
e srl sono trasmesse in buona fede e non comportano alcun vincolo ne' crean=
o obblighi per la Twe srl stessa, salvo che cio' non sia espressamente prev=
isto da un accordo scritto. Questa e-mail e' confidenziale. Qualora l'avess=
e ricevuta per errore, La preghiamo di comunicarne via e-mail la ricezione =
al mittente e di distruggerne il contenuto. La informiamo inoltre che l'uti=
lizzo non autorizzato del messaggio o dei suoi allegati potrebbe costituire=
 reato. </span><span lang=3DEN-GB style=3D'font-size:8.0pt;font-family:"Ari=
al",sans-serif'>Grazie per la collaborazione. <br>&nbsp;<br>General Data Pr=
otection Regulation (GDPR) (EU) 2016/679,<o:p></o:p></span></p><p class=3DM=
soNormal><span lang=3DEN-GB style=3D'font-size:8.0pt;font-family:"Arial",sa=
ns-serif'>E-mails from the Twe srl are sent in good faith but they are neit=
her binding on the Twe srl nor to be understood as creating any obligation =
on its part except where provided for in a written agreement. This e-mail i=
s confidential. If you have received it by mistake, please inform the sende=
r by reply e-mail and delete it from your system. Please also note that the=
 unauthorized disclosure or use of the message or any attachments could be =
an offence. Thank you for your cooperation.<o:p></o:p></span></p><p class=
=3DMsoNormal><span style=3D'font-size:8.0pt;font-family:"Arial",sans-serif;=
color:navy'><o:p>&nbsp;</o:p></span></p><p class=3DMsoNormal><span style=3D=
'mso-fareast-language:EN-US'><o:p>&nbsp;</o:p></span></p><div style=3D'bord=
er:none;border-top:solid #E1E1E1 1.0pt;padding:3.0pt 0cm 0cm 0cm'><p class=
=3DMsoNormal><b>Da:</b> Contact Fotoceramica &lt;adipanfotoceramica@gmail.c=
om&gt; <br><b>Inviato:</b> venerd=C3=AC 13 settembre 2024 17:08<br><b>A:</b=
> c.nicolo@twesrl.it<br><b>Oggetto:</b> Re: info<o:p></o:p></p></div><p cla=
ss=3DMsoNormal><o:p>&nbsp;</o:p></p><div><p class=3DMsoNormal>Thank you!&nb=
sp;<o:p></o:p></p><div><p class=3DMsoNormal><o:p>&nbsp;</o:p></p></div><div=
><p class=3DMsoNormal>I'm attaching the shipment details. Could you please =
add a glue to box 4047?<o:p></o:p></p></div><div><p class=3DMsoNormal><o:p>=
&nbsp;</o:p></p></div><div><p class=3DMsoNormal>Thank you!<o:p></o:p></p></=
div></div><p class=3DMsoNormal><o:p>&nbsp;</o:p></p><div><div><p class=3DMs=
oNormal>=C3=8En vin., 13 sept. 2024 la 17:53, &lt;<a href=3D"mailto:c.nicol=
o@twesrl.it">c.nicolo@twesrl.it</a>&gt; a scris:<o:p></o:p></p></div><block=
quote style=3D'border:none;border-left:solid #CCCCCC 1.0pt;padding:0cm 0cm =
0cm 6.0pt;margin-left:4.8pt;margin-right:0cm'><div><div><div><p class=3DMso=
Normal style=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto'>ADDRESS=
: VIA F. PANZAROLA 32<o:p></o:p></p><p class=3DMsoNormal style=3D'mso-margi=
n-top-alt:auto;mso-margin-bottom-alt:auto'>CITY: PONTE SAN GIOVANNI<o:p></o=
:p></p><p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-margin-bot=
tom-alt:auto'>CAP: 06126<o:p></o:p></p><p class=3DMsoNormal style=3D'mso-ma=
rgin-top-alt:auto;mso-margin-bottom-alt:auto'>PROVINCIA: PG<o:p></o:p></p><=
p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:=
auto'>&nbsp;<o:p></o:p></p><p class=3DMsoNormal style=3D'mso-margin-top-alt=
:auto;mso-margin-bottom-alt:auto'>Bye!<o:p></o:p></p><p class=3DMsoNormal s=
tyle=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto'>&nbsp;<o:p></o:=
p></p><p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-margin-bott=
om-alt:auto'><b><i><span style=3D'font-size:12.0pt;font-family:"Arial",sans=
-serif;color:gray'>Nicol=C3=B2 Castiglioni =E2=80=93 Twe srl</span></i></b>=
<o:p></o:p></p><p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-ma=
rgin-bottom-alt:auto'><span style=3D'font-size:9.0pt;font-family:"Arial",sa=
ns-serif;color:gray'>e-mail:&nbsp; &nbsp;<a href=3D"mailto:c.nicolo@twesrl.=
it" target=3D"_blank">c.nicolo@twesrl.it</a></span><o:p></o:p></p><p class=
=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto'><=
span style=3D'font-size:8.0pt;font-family:"Arial",sans-serif'>Ai sensi del =
General Data Protection Regulation (GDPR) (EU) 2016/679,</span><o:p></o:p><=
/p><p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-margin-bottom-=
alt:auto'><span style=3D'font-size:8.0pt;font-family:"Arial",sans-serif'>Le=
 e-mail provenienti dalla Twe srl sono trasmesse in buona fede e non compor=
tano alcun vincolo ne' creano obblighi per la Twe srl stessa, salvo che cio=
' non sia espressamente previsto da un accordo scritto. Questa e-mail e' co=
nfidenziale. Qualora l'avesse ricevuta per errore, La preghiamo di comunica=
rne via e-mail la ricezione al mittente e di distruggerne il contenuto. La =
informiamo inoltre che l'utilizzo non autorizzato del messaggio o dei suoi =
allegati potrebbe costituire reato. </span><span lang=3DEN-GB style=3D'font=
-size:8.0pt;font-family:"Arial",sans-serif'>Grazie per la collaborazione. <=
br>&nbsp;<br>General Data Protection Regulation (GDPR) (EU) 2016/679,</span=
><o:p></o:p></p><p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-m=
argin-bottom-alt:auto'><span lang=3DEN-GB style=3D'font-size:8.0pt;font-fam=
ily:"Arial",sans-serif'>E-mails from the Twe srl are sent in good faith but=
 they are neither binding on the Twe srl nor to be understood as creating a=
ny obligation on its part except where provided for in a written agreement.=
 This e-mail is confidential. If you have received it by mistake, please in=
form the sender by reply e-mail and delete it from your system. Please also=
 note that the unauthorized disclosure or use of the message or any attachm=
ents could be an offence. Thank you for your cooperation.</span><o:p></o:p>=
</p><p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-margin-bottom=
-alt:auto'><span style=3D'font-size:8.0pt;font-family:"Arial",sans-serif;co=
lor:navy'>&nbsp;</span><o:p></o:p></p><p class=3DMsoNormal style=3D'mso-mar=
gin-top-alt:auto;mso-margin-bottom-alt:auto'>&nbsp;<o:p></o:p></p><div styl=
e=3D'border:none;border-top:solid #E1E1E1 1.0pt;padding:3.0pt 0cm 0cm 0cm'>=
<p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt=
:auto'><b>Da:</b> Contact Fotoceramica &lt;<a href=3D"mailto:adipanfotocera=
mica@gmail.com" target=3D"_blank">adipanfotoceramica@gmail.com</a>&gt; <br>=
<b>Inviato:</b> venerd=C3=AC 13 settembre 2024 16:20<br><b>A:</b> <a href=
=3D"mailto:c.nicolo@twesrl.it" target=3D"_blank">c.nicolo@twesrl.it</a><br>=
<b>Oggetto:</b> info<o:p></o:p></p></div><p class=3DMsoNormal style=3D'mso-=
margin-top-alt:auto;mso-margin-bottom-alt:auto'>&nbsp;<o:p></o:p></p><div><=
p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:=
auto'>Hi,<o:p></o:p></p><div><p class=3DMsoNormal style=3D'mso-margin-top-a=
lt:auto;mso-margin-bottom-alt:auto'>&nbsp;<o:p></o:p></p></div><div><p clas=
s=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto'>=
Do you have any idea on how I can make this address within the character li=
mits? What to put in the indirizzo and what to put in nr. civico?<o:p></o:p=
></p></div><div><p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-m=
argin-bottom-alt:auto'>&nbsp;<o:p></o:p></p></div><div><p class=3DMsoNormal=
 style=3D'mso-margin-top-alt:auto;mso-margin-bottom-alt:auto'><i><span styl=
e=3D'font-size:10.5pt;font-family:"Helvetica",sans-serif;color:#4D4D4D'>VIA=
 F. PANZAROLA N.32, LOC. PONTE SAN GIOVANNI, PERUGIA<br>06126<br>PERUGIA<br=
>PERUGIA</span></i><o:p></o:p></p></div></div></div></div></div></blockquot=
e></div></div></body></html>
------=_NextPart_000_004A_01DB08EF.A54CA070--`;

const threadData = {
  messages: [message1, message2, message3, message4, message5],
};

const rawMail3 = `Delivered-To: adipanfotoceramica@gmail.com
Received: by 2002:a54:2d0c:0:b0:270:20f9:92c6 with SMTP id i12csp1557397ecp;
        Fri, 13 Sep 2024 07:53:04 -0700 (PDT)
X-Google-Smtp-Source: AGHT+IEuLIdZ6EXPu8QqGixwNF/FmAsa04Unn1owi6hVsD7x17TM++97XrI6t2QX41q1OVUsCwiw
X-Received: by 2002:a05:6402:510f:b0:5c2:6083:6256 with SMTP id 4fb4d7f45d1cf-5c413e12255mr5446829a12.10.1726239184559;
        Fri, 13 Sep 2024 07:53:04 -0700 (PDT)
ARC-Seal: i=1; a=rsa-sha256; t=1726239184; cv=none;
        d=google.com; s=arc-20240605;
        b=B734US4wWybD5/K9aCGvF+RFyMtRcfTpQmwlGV5cik4NzkpO/houafZZQaBBzw6OFU
         LehuOCMUB5HjnRKt17OR2sgg3LUjOZkK9QGubnmikdPeJ/+q+Um68JDmeEXqkh2EEwhW
         3Ts1ONlY8Wydl5oRKdETAVh5qKJhTSkxc/GKy9/RMfo77dCeciUlSOt+UqbgH/mFNF/e
         dmj1oxiQrZDx8mO+r/erOkAauACngD0QvWtap1A2xjDYfEnAsvkVHFLgDZXzAEsFcxF4
         FsKn98Rtqa9FVt3w478ZEE4sXahxCPMatASo4bPaJFy3n7absqngqYLkE2KfNidD6CGq
         UtOw==
ARC-Message-Signature: i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20240605;
        h=content-language:thread-index:mime-version:message-id:date:subject
         :in-reply-to:references:to:from:dkim-signature;
        bh=xlmGwdowYA8VhU2Z23b5zq2MzD4qqyMug2k7sZhs8qA=;
        fh=kEPrwn4W4ptaoWl2Yqb/FY1FrvWp2aBAPELylHtvtgk=;
        b=JNsGXqTZuIAUcye5ob6kjLFJa7Q0GCJZ2An7oRUK7y4UlT51Ly3mhWo0JLyLdqe+5H
         zeHTrnI+Pq07NrTy8PVIr4Uk0O8K+Zy+K8Y5hVtcb/GK0aQcD3iPa7GluuFHyLKBpZEw
         aL0s0DDd2FtcLIjSMDxumkbrkD/AjCo/1poLmOa3F0+FJnwbHcrbKg3rMtcBizOfxq9W
         MdAPMEnsZx6VSnGAGPP5f77mvL52gpOyM6suCIGRd8nZMKCfu1+YduYP3Y44uutUOGPU
         pF6poYO/Azq0ngVQ3UoM1SdN/H7aVhCjoHWFy+KNuHFWxeP4Z3vHsNATcpMSDcSan1Ex
         jyHA==;
        dara=google.com
ARC-Authentication-Results: i=1; mx.google.com;
       dkim=pass header.i=@aruba.it header.s=a1 header.b=ditM05Zj;
       spf=pass (google.com: domain of c.nicolo@twesrl.it designates 62.149.158.149 as permitted sender) smtp.mailfrom=c.nicolo@twesrl.it;
       dmarc=pass (p=NONE sp=NONE dis=NONE) header.from=twesrl.it
Return-Path: <c.nicolo@twesrl.it>
Received: from smtpweb149.aruba.it (smtpweb149.aruba.it. [62.149.158.149])
        by mx.google.com with ESMTPS id 4fb4d7f45d1cf-5c3ebd42cd1si10545307a12.30.2024.09.13.07.53.04
        for <adipanfotoceramica@gmail.com>
        (version=TLS1_2 cipher=ECDHE-ECDSA-AES128-GCM-SHA256 bits=128/128);
        Fri, 13 Sep 2024 07:53:04 -0700 (PDT)
Received-SPF: pass (google.com: domain of c.nicolo@twesrl.it designates 62.149.158.149 as permitted sender) client-ip=62.149.158.149;
Authentication-Results: mx.google.com;
       dkim=pass header.i=@aruba.it header.s=a1 header.b=ditM05Zj;
       spf=pass (google.com: domain of c.nicolo@twesrl.it designates 62.149.158.149 as permitted sender) smtp.mailfrom=c.nicolo@twesrl.it;
       dmarc=pass (p=NONE sp=NONE dis=NONE) header.from=twesrl.it
Received: from PCdiNicolo ([95.254.132.80]) by Aruba Outgoing Smtp
  with ESMTPA id p7fUsDK7Axmtup7fUsyxR0; Fri, 13 Sep 2024 16:53:04 +0200
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/simple; d=aruba.it; s=a1; t=1726239184; bh=p4xixwof+UVGOxS1va010oIc8dwHtoebnnT9V4c30Bg=; h=From:To:Subject:Date:MIME-Version:Content-Type; b=ditM05Zj9G22wmARA69ETQwoZL32Vo1j/WMFHh2BpLSXkkpLEzcJT8iwjPA4NYBU4
	 UU9ZXj215e4a1dQJqi5Qo454YO+CaM4fdDEmO7NY1bZ2SO3KEkduD5DZalsuIneh/B
	 LbJjIckUpOZ7gbQiQ1osld+gqb6+Z3H7i81Ms3VlnP18YMap/ac25fUp5xVIr1VmvM
	 7AQaGw4GMvSonr6P0aspSzGlrYEgZ5PzLhb9lvFe+FftKOIDGsYMdYOi0T9h3qiAE5
	 ydnZR+96kI7xXJwAB6z+ZMpaHJIoh4Qr9SpQLXE7HSRhzHNmz8FDe4bGTkSN2XTwL/
	 g4PAI0YnCthlQ==
From: <c.nicolo@twesrl.it>
To: "'Contact Fotoceramica'" <adipanfotoceramica@gmail.com>
References: <CAO_RwRvQ6oT+=p9QBCG-qHuUf8i7vxbnYHErGjd9af1DVPYqSg@mail.gmail.com>
In-Reply-To: <CAO_RwRvQ6oT+=p9QBCG-qHuUf8i7vxbnYHErGjd9af1DVPYqSg@mail.gmail.com>
Subject: R: info
Date: Fri, 13 Sep 2024 16:53:04 +0200
Message-ID: <00dc01db05ec$a30d9a40$e928cec0$@twesrl.it>
MIME-Version: 1.0
Content-Type: multipart/alternative; boundary="----=_NextPart_000_00DD_01DB05FD.66966A40"
X-Mailer: Microsoft Outlook 16.0
Thread-Index: AQIRB+FNAJfajpvwLN3hkzD/7tZh5LHpyVnA
Content-Language: it
X-CMAE-Envelope: MS4xfPlaptjXFlkrlN8siBbjMs9UlPQcvgjXwAc1VflpogztLCIcwzC2aTtiUNy0A4a9IUXrTipdi6jQBdETi7I/zeQlaBjuyLZ+gBn5eXMEJEow7MCaxrPO +cUs+Dv3sVxnw5jD2oIEsP+s3TPfhisojCwRaXPYUwTUhqj9mVFI4y3CmFG4fxRPGrhEtrMF5b95jA==

------=_NextPart_000_00DD_01DB05FD.66966A40
Content-Type: text/plain; charset="UTF-8"
Content-Transfer-Encoding: quoted-printable

ADDRESS: VIA F. PANZAROLA 32

CITY: PONTE SAN GIOVANNI

CAP: 06126

PROVINCIA: PG

=20

Bye!

=20

Nicol=C3=B2 Castiglioni =E2=80=93 Twe srl

e-mail:    <mailto:c.nicolo@twesrl.it> c.nicolo@twesrl.it

Ai sensi del General Data Protection Regulation (GDPR) (EU) 2016/679,

Le e-mail provenienti dalla Twe srl sono trasmesse in buona fede e non comp=
ortano alcun vincolo ne' creano obblighi per la Twe srl stessa, salvo che c=
io' non sia espressamente previsto da un accordo scritto. Questa e-mail e' =
confidenziale. Qualora l'avesse ricevuta per errore, La preghiamo di comuni=
carne via e-mail la ricezione al mittente e di distruggerne il contenuto. L=
a informiamo inoltre che l'utilizzo non autorizzato del messaggio o dei suo=
i allegati potrebbe costituire reato. Grazie per la collaborazione.=20
=20
General Data Protection Regulation (GDPR) (EU) 2016/679,

E-mails from the Twe srl are sent in good faith but they are neither bindin=
g on the Twe srl nor to be understood as creating any obligation on its par=
t except where provided for in a written agreement. This e-mail is confiden=
tial. If you have received it by mistake, please inform the sender by reply=
 e-mail and delete it from your system. Please also note that the unauthori=
zed disclosure or use of the message or any attachments could be an offence=
. Thank you for your cooperation.

=20

=20

Da: Contact Fotoceramica <adipanfotoceramica@gmail.com>=20
Inviato: venerd=C3=AC 13 settembre 2024 16:20
A: c.nicolo@twesrl.it
Oggetto: info

=20

Hi,

=20

Do you have any idea on how I can make this address within the character li=
mits? What to put in the indirizzo and what to put in nr. civico?

=20

VIA F. PANZAROLA N.32, LOC. PONTE SAN GIOVANNI, PERUGIA
06126
PERUGIA
PERUGIA


------=_NextPart_000_00DD_01DB05FD.66966A40
Content-Type: text/html; charset="UTF-8"
Content-Transfer-Encoding: quoted-printable

<html xmlns:v=3D"urn:schemas-microsoft-com:vml" xmlns:o=3D"urn:schemas-micr=
osoft-com:office:office" xmlns:w=3D"urn:schemas-microsoft-com:office:word" =
xmlns:m=3D"http://schemas.microsoft.com/office/2004/12/omml" xmlns=3D"http:=
//www.w3.org/TR/REC-html40"><head><meta http-equiv=3DContent-Type content=
=3D"text/html; charset=3Dutf-8"><meta name=3DGenerator content=3D"Microsoft=
 Word 15 (filtered medium)"><style><!--
/* Font Definitions */
@font-face
=09{font-family:Helvetica;
=09panose-1:2 11 6 4 2 2 2 2 2 4;}
@font-face
=09{font-family:"Cambria Math";
=09panose-1:2 4 5 3 5 4 6 3 2 4;}
@font-face
=09{font-family:Calibri;
=09panose-1:2 15 5 2 2 2 4 3 2 4;}
/* Style Definitions */
p.MsoNormal, li.MsoNormal, div.MsoNormal
=09{margin:0cm;
=09font-size:11.0pt;
=09font-family:"Calibri",sans-serif;}
span.StileMessaggioDiPostaElettronica18
=09{mso-style-type:personal-reply;
=09font-family:"Calibri",sans-serif;
=09color:windowtext;}
.MsoChpDefault
=09{mso-style-type:export-only;
=09mso-fareast-language:EN-US;}
@page WordSection1
=09{size:612.0pt 792.0pt;
=09margin:70.85pt 2.0cm 2.0cm 2.0cm;}
div.WordSection1
=09{page:WordSection1;}
--></style><!--[if gte mso 9]><xml>
<o:shapedefaults v:ext=3D"edit" spidmax=3D"1026" />
</xml><![endif]--><!--[if gte mso 9]><xml>
<o:shapelayout v:ext=3D"edit">
<o:idmap v:ext=3D"edit" data=3D"1" />
</o:shapelayout></xml><![endif]--></head><body lang=3DIT link=3D"#0563C1" v=
link=3D"#954F72" style=3D'word-wrap:break-word'><div class=3DWordSection1><=
p class=3DMsoNormal><span style=3D'mso-fareast-language:EN-US'>ADDRESS: VIA=
 F. PANZAROLA 32<o:p></o:p></span></p><p class=3DMsoNormal><span style=3D'm=
so-fareast-language:EN-US'>CITY: PONTE SAN GIOVANNI<o:p></o:p></span></p><p=
 class=3DMsoNormal><span style=3D'mso-fareast-language:EN-US'>CAP: 06126<o:=
p></o:p></span></p><p class=3DMsoNormal><span style=3D'mso-fareast-language=
:EN-US'>PROVINCIA: PG<o:p></o:p></span></p><p class=3DMsoNormal><span style=
=3D'mso-fareast-language:EN-US'><o:p>&nbsp;</o:p></span></p><p class=3DMsoN=
ormal><span style=3D'mso-fareast-language:EN-US'>Bye!<o:p></o:p></span></p>=
<p class=3DMsoNormal><span style=3D'mso-fareast-language:EN-US'><o:p>&nbsp;=
</o:p></span></p><p class=3DMsoNormal style=3D'mso-margin-top-alt:auto;mso-=
margin-bottom-alt:auto'><b><i><span style=3D'font-size:12.0pt;font-family:"=
Arial",sans-serif;color:gray'>Nicol=C3=B2 Castiglioni =E2=80=93 Twe srl</sp=
an></i></b><span style=3D'font-size:12.0pt;font-family:"Times New Roman",se=
rif'><o:p></o:p></span></p><p class=3DMsoNormal style=3D'mso-margin-top-alt=
:auto;mso-margin-bottom-alt:auto'><span style=3D'font-size:9.0pt;font-famil=
y:"Arial",sans-serif;color:gray'>e-mail:=C2=A0 =C2=A0<a href=3D"mailto:c.ni=
colo@twesrl.it"><span style=3D'color:blue'>c.nicolo@twesrl.it</span></a></s=
pan><span style=3D'font-size:12.0pt;font-family:"Times New Roman",serif'><o=
:p></o:p></span></p><p class=3DMsoNormal><span style=3D'font-size:8.0pt;fon=
t-family:"Arial",sans-serif'>Ai sensi del General Data Protection Regulatio=
n (GDPR) (EU) 2016/679,<o:p></o:p></span></p><p class=3DMsoNormal><span sty=
le=3D'font-size:8.0pt;font-family:"Arial",sans-serif'>Le e-mail provenienti=
 dalla Twe srl sono trasmesse in buona fede e non comportano alcun vincolo =
ne' creano obblighi per la Twe srl stessa, salvo che cio' non sia espressam=
ente previsto da un accordo scritto. Questa e-mail e' confidenziale. Qualor=
a l'avesse ricevuta per errore, La preghiamo di comunicarne via e-mail la r=
icezione al mittente e di distruggerne il contenuto. La informiamo inoltre =
che l'utilizzo non autorizzato del messaggio o dei suoi allegati potrebbe c=
ostituire reato. </span><span lang=3DEN-GB style=3D'font-size:8.0pt;font-fa=
mily:"Arial",sans-serif'>Grazie per la collaborazione. <br>&nbsp;<br>Genera=
l Data Protection Regulation (GDPR) (EU) 2016/679,<o:p></o:p></span></p><p =
class=3DMsoNormal><span lang=3DEN-GB style=3D'font-size:8.0pt;font-family:"=
Arial",sans-serif'>E-mails from the Twe srl are sent in good faith but they=
 are neither binding on the Twe srl nor to be understood as creating any ob=
ligation on its part except where provided for in a written agreement. This=
 e-mail is confidential. If you have received it by mistake, please inform =
the sender by reply e-mail and delete it from your system. Please also note=
 that the unauthorized disclosure or use of the message or any attachments =
could be an offence. Thank you for your cooperation.<o:p></o:p></span></p><=
p class=3DMsoNormal><span style=3D'font-size:8.0pt;font-family:"Arial",sans=
-serif;color:navy'><o:p>&nbsp;</o:p></span></p><p class=3DMsoNormal><span s=
tyle=3D'mso-fareast-language:EN-US'><o:p>&nbsp;</o:p></span></p><div style=
=3D'border:none;border-top:solid #E1E1E1 1.0pt;padding:3.0pt 0cm 0cm 0cm'><=
p class=3DMsoNormal><b>Da:</b> Contact Fotoceramica &lt;adipanfotoceramica@=
gmail.com&gt; <br><b>Inviato:</b> venerd=C3=AC 13 settembre 2024 16:20<br><=
b>A:</b> c.nicolo@twesrl.it<br><b>Oggetto:</b> info<o:p></o:p></p></div><p =
class=3DMsoNormal><o:p>&nbsp;</o:p></p><div><p class=3DMsoNormal>Hi,<o:p></=
o:p></p><div><p class=3DMsoNormal><o:p>&nbsp;</o:p></p></div><div><p class=
=3DMsoNormal>Do you have any idea on how I can make this address within the=
 character limits? What to put in the indirizzo and what to put in nr. civi=
co?<o:p></o:p></p></div><div><p class=3DMsoNormal><o:p>&nbsp;</o:p></p></di=
v><div><p class=3DMsoNormal><i><span style=3D'font-size:10.5pt;font-family:=
"Helvetica",sans-serif;color:#4D4D4D'>VIA F. PANZAROLA N.32, LOC. PONTE SAN=
 GIOVANNI, PERUGIA<br>06126<br>PERUGIA<br>PERUGIA</span></i><o:p></o:p></p>=
</div></div></div></body></html>
------=_NextPart_000_00DD_01DB05FD.66966A40--`;

const rawMail2 = `Delivered-To: adipanfotoceramica@gmail.com
Received: by 2002:a54:23c9:0:b0:273:c875:1433 with SMTP id h9csp299472eco;
        Wed, 25 Sep 2024 05:14:30 -0700 (PDT)
X-Google-Smtp-Source: AGHT+IE2MngL/GZ8KoQDkLrasRjh7WRKseLTaoaUcjZD+Bgh1NDXaoLk4tlZpXuM9bGEr6I6lH/i
X-Received: by 2002:a5d:5d86:0:b0:37c:c51b:8d9b with SMTP id ffacd0b85a97d-37cc51b8e5emr983426f8f.40.1727266470585;
        Wed, 25 Sep 2024 05:14:30 -0700 (PDT)
ARC-Seal: i=1; a=rsa-sha256; t=1727266470; cv=none;
        d=google.com; s=arc-20240605;
        b=XIwn6nmY9zoUzAqFJr1ikigB1sIwLa6KRJ3W9UUHoF1+UhpoIaj9KPewPXketGxVSy
         w9eI4abfe+BFxL5P4/XwoiCNtKEcb5rzO7hcab8SlXlD+xAEBLp66Ak41ms+Xgbt4gn0
         FCFYmk41JmFfljwCVu/SfRIzV7QYFhhbIlHNmf5pyObrZOLAHY3nTnwe0UptojECgqBf
         D7avYDbDUjtKUp8akjJMKOqiqBznbzydwIhCo+pGqLqvHJTtayfPGrdMlie3QrVf5oIV
         969x384aZDlOQsTnnzWsPygQeGlQwV8BgFQCKLmNa3Fi/2mzTJHtCPPoIilZn58A0yOo
         apgg==
ARC-Message-Signature: i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20240605;
        h=content-transfer-encoding:subject:date:to:from:mime-version
         :message-id;
        bh=S9eYhUE/smmoKCya+QcpjCS7FHgeiX7ewTPOJdNA1Ok=;
        fh=4Tfwkg2ZOig3Iny281DgSnsdARJmpKBlunXshNgRKVw=;
        b=DtME3a5z2aR5slJMlpun6PECzJ2lDftl36iPv1u5J048Sxb9mYPZ5LWr1z0OfNYP1N
         NvN+z5cTtFDVSiKvs1HuFrtPX8pQwJT8yTtK+y8hFXpGPtlo4skjGWplUhvIDwylQtkk
         /dp/wLU8lZ9PnN5ZeVVJEnWk3gr4vIVGxIMkeL+iXsVbn02Zn8Dcq65Y4+tWW7C5IvcW
         61Bob7qGwTX1FR2ia3sVNU60LUycvwCygU4XIB2oak4g/3WHcT8JkxoCJm3AtpTd0P1d
         QPIoO22eJD/iPLp1Vo1Boq/UUqARTMZ0JNtl4eSAeLGKnlTkxAr/cJLxDNvrNARD127k
         Uamg==;
        dara=google.com
ARC-Authentication-Results: i=1; mx.google.com;
       spf=pass (google.com: domain of noreply@gls-romania.ro designates 89.39.93.8 as permitted sender) smtp.mailfrom=noreply@gls-romania.ro;
       dmarc=pass (p=QUARANTINE sp=QUARANTINE dis=NONE) header.from=gls-romania.ro
Return-Path: <noreply@gls-romania.ro>
Received: from g2-mail.gls-romania.ro (g2-mail.gls-romania.ro. [89.39.93.8])
        by mx.google.com with ESMTPS id 5b1f17b1804b1-42e969f18e9si6019315e9.48.2024.09.25.05.14.30
        for <adipanfotoceramica@gmail.com>
        (version=TLS1_3 cipher=TLS_AES_256_GCM_SHA384 bits=256/256);
        Wed, 25 Sep 2024 05:14:30 -0700 (PDT)
Received-SPF: pass (google.com: domain of noreply@gls-romania.ro designates 89.39.93.8 as permitted sender) client-ip=89.39.93.8;
Authentication-Results: mx.google.com;
       spf=pass (google.com: domain of noreply@gls-romania.ro designates 89.39.93.8 as permitted sender) smtp.mailfrom=noreply@gls-romania.ro;
       dmarc=pass (p=QUARANTINE sp=QUARANTINE dis=NONE) header.from=gls-romania.ro
Message-ID: <66f3fea6.050a0220.2814c8.f6c4SMTPIN_ADDED_MISSING@mx.google.com>
Received: from wnsiis45 (unknown [10.122.240.45]) by g2-mail.gls-romania.ro (Postfix) with ESMTP id 9C78E107326 for <adipanfotoceramica@gmail.com>; Wed, 25 Sep 2024 15:14:14 +0300 (EEST)
MIME-Version: 1.0
From: noreply@gls-romania.ro
To: adipanfotoceramica@gmail.com
Date: 25 Sep 2024 14:14:14 +0200
Subject: Informare cu privire la un colet GLS / GLS parcel information
Content-Type: text/html; charset=utf-8
Content-Transfer-Encoding: base64

77u/PCFET0NUWVBFIGh0bWw+DQoNCjxodG1sIGxhbmc9ImVuIiB4bWxucz0iaHR0cDovL3d3dy53
My5vcmcvMTk5OS94aHRtbCI+DQo8aGVhZD4NCiAgICA8bWV0YSBjaGFyc2V0PSJ1dGYtOCIgLz4N
CiAgICA8dGl0bGU+SW5mb3JtYXJlIGN1IHByaXZpcmUgbGEgdW4gY29sZXQgR0xTIC8gR0xTIHBh
cmNlbCBpbmZvcm1hdGlvbjwvdGl0bGU+DQo8L2hlYWQ+DQo8Ym9keT4NCiAgICA8Zm9udCBmYWNl
PSJhcmlhbCIgY29sb3I9IiMwMDAwMDAiIHNpemU9IjIiPg0KICAgICAgICA8YnIgLz4NCiAgICAg
ICAgU3RpbWF0ZSBEZXN0aW5hdGFyLA0KICAgICAgICA8YnIgLz4NCiAgICAgICAgPGJyIC8+DQog
ICAgICAgIFbEgyBpbmZvcm3Eg20gY8SDIDxiPkZPVE8tUEUtQ0VSQU1JQ0EuUk8gPC9iPmEgcHJl
Z8SDdGl0IGNvbGV0dWwgY3UgbnVtxINydWwgPGI+NjExMzg3NjI1MiA8L2I+cGVudHJ1IGR1bW5l
YXZvYXN0csSDLg0KICAgICAgICA8YnIgLz4NCiAgICAgICAgRHVwxIMgcHJlZGFyZWEgY29sZXR1
bHVpIGPEg3RyZSBHTFMsIGFjZXN0YSBzZSB2YSBsaXZyYSBsYSB1cm3Eg3RvYXJlYSBhZHJlc8SD
OiBDb3N0ZWwgVGl1LCBCdWxldmFyZHVsIFRyYWlhbiBWdWlhIG5yLiAyNCBibG9jIFY1IHNjLjEg
YXAuMiwgODAwNTQyIEdhbGF0aSwgaW5jZXBhbmQgY3UgdXJtYXRvYXJlYSB6aSBsdWNyYXRvYXJl
LCDDrm50cmUgb3JlbGUgODowMC0yMDowMC4gUHJvZ3JhbWFyZWEgbGl2csSDcmlpIGxhIG9yYSBm
aXjEgyBudSBlc3RlIHBvc2liaWzEgy4NCiAgICAgICAgPGJyIC8+DQogICAgICAgIExhIGxpdnJh
cmUgdmEgdHJlYnVpIHPEgyBhY2hpdGHFo2kgc3VtYSByYW1idXJzIGRlIDAgLg0KICAgICAgICA8
YnIgLz4NCgkJPGJyIC8+DQogICAgICAgIFBlbnRydSBhIHVybcSDcmkgcGFyY3Vyc3VsIGNvbGV0
dWx1aSwgYWNjZXNhxaNpIHBhZ2luYSA8YSBocmVmPSJodHRwczovL2dscy1ncm91cC5ldS9STy9y
by91cm1hcmlyZS1jb2xldCI+aHR0cHM6Ly9nbHMtZ3JvdXAuZXUvUk8vcm8vdXJtYXJpcmUtY29s
ZXQ8L2E+LiBpbiBtb21lbnR1bCBpbiBjYXJlIGNvbGV0dWwgYWp1bmdlIGluIHBvc2VzaWEgR0xT
LCBzdGF0dXN1bCBhY2VzdHVpYSBzZSB2YSBhY3R1YWxpemEuDQogICAgICAgIDxiciAvPg0KICAg
ICAgICBEYWPEgyBkb3JpxaNpIHPEgyBhbGVnZcWjaSBvIG5vdcSDIGFkcmVzxIMgc2F1IGRhdGEg
ZGUgbGl2cmFyZSwgdsSDIHJ1Z8SDbSBzxIMgbmUgb2ZlcmnFo2kgaW5zdHJ1Y8WjaXVuaSBhY2Nl
c8OibmQgcGFnaW5hIDxhIGhyZWY9Imh0dHBzOi8vZG0ubXlnbHMucm8vQWNjb3VudC9Mb2dpbj9w
YXJjZWxOdW1iZXI9NjExMzg3NjI1MiZwaW49NlM2RkUiPmh0dHBzOi8vZG0ubXlnbHMucm8vQWNj
b3VudC9Mb2dpbj9wYXJjZWxOdW1iZXI9NjExMzg3NjI1MiZwaW49NlM2RkU8L2E+LCBmb2xvc2lu
ZCBudW3Eg3J1bCBkZSBjb2xldCA2MTEzODc2MjUyIMWfaSBwYXJvbGEgNlM2RkUNCiAgICAgICAg
PGJyIC8+DQogICAgICAgIDxiciAvPg0KCQlBbHRlIG1vZGlmaWPEg3JpIGFzdXByYSBjb2xldHVs
dWkgcG90IGZpIGVmZWN0dWF0ZSBkb2FyIGRpbiBtb21lbnR1bCDDrm4gY2FyZSBjb2xldHVsIGFq
dW5nZSDDrm4gcG9zZXNpYSBHTFMgUm9tw6JuaWEuDQogICAgICAgIDxiciAvPg0KCQlPcmljZSBt
b2RpZmljYXJlIHNvbGljaXRhdMSDIHBlbnRydSBjb2xldCBwcmVzdXB1bmUgbyBkZWNhbGFyZSBh
IHRpbXB1bHVpIGRlIHRyYW56aXQgY3UgYXByb3hpbWF0aXYgMS0yIHppbGUgbHVjcsSDdG9hcmUg
ZGUgbGEgdHJhbnNtaXRlcmVhIGluZm9ybWHFo2lpbG9yLg0KICAgICAgICA8YnIgLz4NCgkJPGJy
IC8+DQogICAgICAgIMOObiBkaW1pbmVhxaNhIGxpdnLEg3JpaSB2ZcWjaSBwcmltaSB1biBlLW1h
aWwgY3UgbWFpIG11bHRlIGluZm9ybWHFo2lpIHJlZmVyaXRvYXJlIGxhIGNvbGV0LCBpbmNsdXNp
diB1biBpbnRlcnZhbHVsIGRlIGxpdnJhcmUgZGUgMyBvcmUgxZ9pIG51bcSDcnVsIGRlIHRlbGVm
b24gYWwgY3VyaWVydWx1aS4NCiAgICAgICAgPGJyIC8+DQoJCTxiciAvPg0KICAgICAgICBBY2Vz
dGEgZXN0ZSB1biBlLW1haWwgYXV0b21hdCwgdsSDIHJ1Z8SDbSBudSByYXNwdW5kZcWjaS4NCiAg
ICAgICAgPGJyIC8+DQogICAgICAgIDxiciAvPg0KCQlPIHppIHBsxINjdXTEgywNCiAgICAgICAg
PGJyIC8+DQoJCUdMUyBSb23Dom5pYQ0KICAgICAgICA8YnIgLz4NCgkJPGEgaHJlZj0iaHR0cHM6
Ly9nbHMtZ3JvdXAuZXUvUk8vcm8vaG9tZS8iPmh0dHBzOi8vZ2xzLWdyb3VwLmV1L1JPL3JvL2hv
bWUvPC9hPg0KCQk8YnIgLz4NCgkJPGJyIC8+DQoJCTxiciAvPg0KCQk8YnIgLz4NCgkJPGJyIC8+
DQoJCURlYXIgQ29uc2lnbmVlLA0KICAgICAgICA8YnIgLz4NCiAgICAgICAgPGJyIC8+DQogICAg
ICAgIFBsZWFzZSBiZSBpbmZvcm1lZCB0aGF0PGI+IEZPVE8tUEUtQ0VSQU1JQ0EuUk8gPC9iPmhh
cyBwcmVwYXJlZCA8Yj42MTEzODc2MjUyIDwvYj5wYXJjZWwgZm9yIHlvdS4NCiAgICAgICAgPGJy
IC8+DQogICAgICAgIEluIGNhc2UgeW91ciBwYXJjZWwgaXMgZGlzcGF0Y2hlZCB0b2RheSwgb3Vy
IEdMUyBkcml2ZXIgd2lsbCBkZWxpdmVyIGl0IHRvIHRoZSBmb2xsb3dpbmcgYWRkcmVzczogQ29z
dGVsIFRpdSwgQnVsZXZhcmR1bCBUcmFpYW4gVnVpYSBuci4gMjQgYmxvYyBWNSBzYy4xIGFwLjIs
IDgwMDU0MiBHYWxhdGksIG9uIHRoZSBuZXh0IHdvcmtpbmcgZGF5LCBiZXR3ZWVuIDg6MDAtMjA6
MDAuIFNjaGVkdWxpbmcgZGVsaXZlcnkgYXQgZml4ZWQgaG91ciBpcyBub3QgcG9zc2libGUuDQog
ICAgICAgIDxiciAvPg0KICAgICAgICBPbiBkZWxpdmVyeSB5b3Ugd2lsbCBoYXZlIHRvIHBheSBm
b3IgY2FzaC1vbi1kZWxpdmVyeSwgdGhlIGFtb3VudCBvZiAwIA0KICAgICAgICA8YnIgLz4NCgkJ
PGJyIC8+DQogICAgICAgIEluIG9yZGVyIHRvIHRyYWNrIHlvdXIgcGFyY2VsLCBwbGVhc2UgYWNj
ZXNzIDxhIGhyZWY9Imh0dHBzOi8vZ2xzLWdyb3VwLmV1L1JPL2VuL3BhcmNlbC10cmFja2luZyI+
aHR0cHM6Ly9nbHMtZ3JvdXAuZXUvUk8vZW4vcGFyY2VsLXRyYWNraW5nPC9hPi4gV2hlbiB0aGUg
cGFyY2VsIGFycml2ZXMgdG8gYSBHTFMgbG9jYXRpb24sIHRoZSBwYXJjZWwgc3RhdHVzIHdpbGwg
YmUgdXBkYXRlZC4NCiAgICAgICAgPGJyIC8+DQogICAgICAgIElmIHlvdSB3b3VsZCBsaWtlIHRv
IGNoYW5nZSB0aGUgZGVsaXZlcnkgYWRkcmVzcyBvciBkYXRlLCBwbGVhc2Ugc2VuZCB1cyB5b3Vy
IGluc3RydWN0aW9ucyB0b2RheSBieSBmb2xsb3dpbmcgdGhlIGxpbms6IDxhIGhyZWY9Imh0dHBz
Oi8vZG0ubXlnbHMucm8vQWNjb3VudC9Mb2dpbj9wYXJjZWxOdW1iZXI9NjExMzg3NjI1MiZwaW49
NlM2RkUiPmh0dHBzOi8vZG0ubXlnbHMucm8vQWNjb3VudC9Mb2dpbj9wYXJjZWxOdW1iZXI9NjEx
Mzg3NjI1MiZwaW49NlM2RkU8L2E+LCBhbmQgdXNpbmcgeW91ciBwYXJjZWwgSUQgNjExMzg3NjI1
MiBhbmQgcGFzc3dvcmQgNlM2RkUNCiAgICAgICAgPGJyIC8+DQogICAgICAgIDxiciAvPg0KCQlP
dGhlciBjaGFuZ2VzIHRvIHRoZSBwYXJjZWwgY2FuIG9ubHkgYmUgbWFkZSBmcm9tIHRoZSBtb21l
bnQgeW91ciBwYXJjZWwgcmVhY2hlcyBHTFMgUm9tYW5pYS4NCiAgICAgICAgPGJyIC8+DQoJCUFu
eSBjaGFuZ2UgcmVxdWVzdCBmb3IgeW91ciBwYXJjZWwgaW1wbGllcyBhIGRlbGF5IGluIHRoZSB0
cmFuc2l0IHRpbWUgb2YgYXBwcm94aW1hdGVseSAxLTIgYnVzaW5lc3MgZGF5cyBhZnRlciB0aGUg
c3VibWlzc2lvbiBvZiB0aGUgaW5mb3JtYXRpb24uDQogICAgICAgIDxiciAvPg0KCQk8YnIgLz4N
CiAgICAgICAgSW4gdGhlIG1vcm5pbmcgb2YgdGhlIGRlbGl2ZXJ5IGRheSwgeW91IHdpbGwgcmVj
ZWl2ZSBhbiBlLW1haWwgd2l0aCBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBkZWxp
dmVyeSwgY29udGFpbmluZyBhIHRocmVlLWhvdXIgZGVsaXZlcnkgdGltZSBmcmFtZSBhbmQgdGhl
IGRlbGl2ZXJ5IGRyaXZlciZhcG9zO3MgdGVsZXBob25lIG51bWJlci4NCiAgICAgICAgPGJyIC8+
DQoJCTxiciAvPg0KCQlUaGlzIGlzIGFuIGF1dG9tYXRpYyBlLW1haWwsIHBsZWFzZSBkbyBub3Qg
cmVwbHkuDQogICAgICAgIDxiciAvPg0KICAgICAgICA8YnIgLz4NCgkJS2luZCByZWdhcmRzLA0K
ICAgICAgICA8YnIgLz4NCgkJR0xTIFJvbWFuaWENCiAgICAgICAgPGJyIC8+DQoJCTxhIGhyZWY9
Imh0dHBzOi8vZ2xzLWdyb3VwLmV1L1JPL2VuL2hvbWUvIj5odHRwczovL2dscy1ncm91cC5ldS9S
Ty9lbi9ob21lLzwvYT4NCg0KICAgIDwvZm9udD4NCjwvYm9keT4NCjwvaHRtbD4=`;

const rawMail = `Delivered-To: adipanfotoceramica@gmail.com
Received: by 2002:a05:6400:91:b0:273:c875:1433 with SMTP id hq17csp763486ecb;
        Tue, 24 Sep 2024 08:03:44 -0700 (PDT)
X-Google-Smtp-Source: AGHT+IGvXIB2VHFl1W+zfRP4p+KWxEnYYkIV30ux+wR+zk6JLeQPydr0tHPABJ36zq6B2NafoNK+
X-Received: by 2002:a05:620a:454c:b0:7a9:c0b8:9337 with SMTP id af79cd13be357-7acb80ccd55mr2778377185a.37.1727190224272;
        Tue, 24 Sep 2024 08:03:44 -0700 (PDT)
ARC-Seal: i=1; a=rsa-sha256; t=1727190224; cv=none;
        d=google.com; s=arc-20240605;
        b=K8DSwasgJHTf4EFD21NEOwQN4D5ABreFwZl4mtlphHaPHMyzbsuVME6f6kewoHzXnp
         ppm8E6ErjY+Zlt2ZD5xj3zEiUhdplhp59k1wfGJWpH3A4li9y5wYRfY3peLWVBzFe4sr
         7UP7ZQsuKptCrPVP3K5Le41QNwzGbiKxzPosiZ1lqNZmyi3TojzOSVHSVoovj6/OGULK
         0yHwoQMMx2c+cJ2Y5gy6pUDhMohNz3u2aalhlDJ4N52xRWjuyQjbDYdRgxKnIUqZe0Df
         NN6/aV3jWDJW0JMAJnv4EKLJZ4lzckLyowS79jrkaPEKyol/wWIAOhvZPa+7NfICIFhI
         EkhQ==
ARC-Message-Signature: i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20240605;
        h=to:list-unsubscribe:list-unsubscribe-post:reply-to:subject
         :message-id:mime-version:from:date:dkim-signature:dkim-signature;
        bh=BOejZ7A9Hege+CmsELD6YZGZ5S10x8wQD3RSvO8Exws=;
        fh=4Tfwkg2ZOig3Iny281DgSnsdARJmpKBlunXshNgRKVw=;
        b=EvX+yGz9nGaGhWCvafylkikcyg/W6CAI2X+BpjvJdreg6BIFzpKdz+GBh2Nh9PAxXR
         yy9XMxbMNpLKMElxDYL+Sz/ATHhWJCvofpi0AC5DOd9zIyZ7BT/4arUZcg9Wr/HMR5Ld
         iQXv5A02LyRWmPkSJA0jJd9w3LK4VO/PTMMdiGCGCQqW8/c/rskp3i84T0474t28Om/p
         svn0887sjjs5N6sY4Wh2FSvF756GBt7dstz+7w2hLSF8Ma62dhuaLa+DgSvtU4Hu0lEO
         nUP4ok/8plOkH88cctL53rtcMqUu2tWEZIBVZExlF2Ug4AZZbWKLr4wdkzNOHFiS0kAn
         40Sw==;
        dara=google.com
ARC-Authentication-Results: i=1; mx.google.com;
       dkim=pass header.i=@announce.fiverr.com header.s=s1 header.b="L4stNe5/";
       dkim=pass header.i=@sendgrid.info header.s=smtpapi header.b=PAHPYpXh;
       spf=pass (google.com: domain of bounces+2943270-a914-adipanfotoceramica=gmail.com@mail.announce.fiverr.com designates 167.89.95.39 as permitted sender) smtp.mailfrom="bounces+2943270-a914-adipanfotoceramica=gmail.com@mail.announce.fiverr.com";
       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=fiverr.com
Return-Path: <bounces+2943270-a914-adipanfotoceramica=gmail.com@mail.announce.fiverr.com>
Received: from o111.mail.announce.fiverr.com (o111.mail.announce.fiverr.com. [167.89.95.39])
        by mx.google.com with ESMTPS id af79cd13be357-7acde60b720si174453885a.456.2024.09.24.08.03.43
        for <adipanfotoceramica@gmail.com>
        (version=TLS1_3 cipher=TLS_AES_128_GCM_SHA256 bits=128/128);
        Tue, 24 Sep 2024 08:03:44 -0700 (PDT)
Received-SPF: pass (google.com: domain of bounces+2943270-a914-adipanfotoceramica=gmail.com@mail.announce.fiverr.com designates 167.89.95.39 as permitted sender) client-ip=167.89.95.39;
Authentication-Results: mx.google.com;
       dkim=pass header.i=@announce.fiverr.com header.s=s1 header.b="L4stNe5/";
       dkim=pass header.i=@sendgrid.info header.s=smtpapi header.b=PAHPYpXh;
       spf=pass (google.com: domain of bounces+2943270-a914-adipanfotoceramica=gmail.com@mail.announce.fiverr.com designates 167.89.95.39 as permitted sender) smtp.mailfrom="bounces+2943270-a914-adipanfotoceramica=gmail.com@mail.announce.fiverr.com";
       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=fiverr.com
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=announce.fiverr.com; h=content-type:from:mime-version:subject:reply-to:list-unsubscribe-post: list-unsubscribe:x-feedback-id:to:cc:content-type:from:subject:to; s=s1; bh=BOejZ7A9Hege+CmsELD6YZGZ5S10x8wQD3RSvO8Exws=; b=L4stNe5/ApiqVc7bdcpO/YIQlcO2yNr+AHj4JoeX9lPRt2hbjycoGqq/tm+nrQcJxbjp fbN+wrBfk0Cj0z3ppVScs7b21JDYqeZL9xE81jq5o9fCUJmEZaEyiubyyTqXlNMlU0pmhC WE47xIeMy0jUy1vP9VSyiWaGUqe5SWFe+KHl+cCESkRstZOnM0kyQZ+N+MCLXn9/qIUdVM nq4k6Y6Zo4yQtp6h68eMgHFOIRjcITPTSS2CwBZI9iJGPlvUVVuOnrlsxJK3Nayx2RitXN VhqWZGNpa81Ugw4tEAzU6xW7+udTwLUQ74ATV5g1fTDDq2TZXpa/CUPnNq2H2Z7A==
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=sendgrid.info; h=content-type:from:mime-version:subject:reply-to:list-unsubscribe-post: list-unsubscribe:x-feedback-id:to:cc:content-type:from:subject:to; s=smtpapi; bh=BOejZ7A9Hege+CmsELD6YZGZ5S10x8wQD3RSvO8Exws=; b=PAHPYpXhqTa8FL3T24AsPkiFgY2lKQMLRqrub1LmGetVEdb/rsX66K6viAqan6+OL0FB KxTfYIQM4DjJqLYBN7SYn+w7oXtDYqOkiI1DuUtJhqCrmfQ9lw5fp4+Xn/LeqFyho1meRF 4ej3AV9gvh8kMAJHhF3oIKSZuveeaUBDA=
Received: by recvd-6c5d4886df-h8ntn with SMTP id recvd-6c5d4886df-h8ntn-1-66F2D4CE-68 2024-09-24 15:03:42.888754895 +0000 UTC m=+1026444.996688098
Received: from Mjk0MzI3MA (unknown) by geopod-ismtpd-35 (SG) with HTTP id OWmuxMNaQt2QcJpgSafIog Tue, 24 Sep 2024 15:03:42.832 +0000 (UTC)
Content-Type: multipart/alternative; boundary=4b2c80fd3166b840258a19e843407a41ea5b0d7a481a9af82bcc95473c61
Date: Tue, 24 Sep 2024 15:03:42 +0000 (UTC)
From: Fiverr <no-reply@announce.fiverr.com>
Mime-Version: 1.0
Message-ID: <OWmuxMNaQt2QcJpgSafIog@geopod-ismtpd-35>
Subject: Your smartest shopping season starts now
Reply-To: no-reply@fiverr.com
List-Unsubscribe-Post: List-Unsubscribe=One-Click
List-Unsubscribe: <https://01.emailinboundprocessing.com/enc_user/list_unsubscribe?d=%241%248ub%2F9gB%2FQHXDiyfgi%2FOCWw%3D%3D%245hrgco2IaX75dYIQWn5JzutphCqkjsg61MYeMMrO8IVvbBkPdoRWHXz3bfuz%0AVV%2FNj4Wl4W1yixhbsPLyRXHVBoMzOj4wx%2BirJ2%2Fx8qFttorNN3yYK6nIROwL%0AeON1EPMOz065SQd0IhfX2OqF3Traou2ey21ui300km5qPGMjlGEgo3CEpva9%0ARxZ0j8lXm5dcNaq322GRd3kGxyi065RFSJqXYbbkTdt5tb4Xgta54Q5vZPRD%0Abbf2uAH0YjJH8KyXp%2FnIwh%2BGc6TeGSsXXNJHKnu9O5r0dZq4xTw38Oswsbr0%0AskxNh1dCjMjBnLVxWFB5pKV3XCgR%2F7mgKfJPsB7z8oXAmo9v%2F4owUXzGWl8D%0A0f2l%2BT6c5vkjkelFWtreQPNn5nWj3sj%2Fe4NB5juiKVmvXQ%3D%3D&1=1>,<mailto:4_lp5e2juw4grm1qdl0aiz2g4m2oibxrfjx4sr60kdu32u5q6kbsf1he@unsubscribe.emailinboundprocessing.com?subject=Unsubscribe%20pnrcgsq18aevei2uh3dazlosjs7rq5gicf5cpm4shief7c7fo8dnwovcfd&body=DO_NOT_DELETE-17n89q2kt2765ujkiowxvkrkj6gbnt1voso32l7p6dgp0v6xt8tzgc0q0w8rlhfhw6tzgxyr76mjuugwgnlsqslap54m6245m5-DO_NOT_DELETE>
X-Feedback-ID: 2943270:SG
X-SG-EID: u001.6wixtW/x/9pD3YSxfQKedfHviTEbCu7mn5qMvmHzefW9Cn9fE6/pNzuxskqDmbcy/96asrfx3vG1gqSmoiQlu0V0BLKQf1bJ+ryjw+hS9jiG/JV5sDuytxWpbxhhSvRDRpft1NI1eLYNkzzersfJLHUpiWUvOT0eFhVxcR0Ufrm0MncLlkFLYaSiCZNphgqtVyHDH0w2wn0uFRC3czSRgFlYwvs3VmMUaU3GjnF8Ode7mw2UUzpCKVVzB48LKPSu
X-SG-ID: u001.SdBcvi+Evd/bQef8eZF3BpTL9BgbK5wfSJMJGMsmprDrjDW6011yC6XOo3uya5MXW+MYNAvVV38aGIKS6RSoD8uCb7GzjoBcEutXWxEp6S2dVCUZUUL0o+KWXF9r2Y5HKxt1OnNixAfSpAXcxyhYo0bMr0XLvlWRJ5gvyGiHAU9z8fbcxwUtgFexBuKOBfMQy2w5wnppOrDmydhpEdQ8irWWZzq24uAZQKid2Ggc9Osjn5ooMobZUDkQniuDliNPoq/Bcwk/alCN579OHguzoetuCfKbp/gX5Oyry95gXHoKMrDLIjZPYD/Tm67Fy0qGzixvl8xaYkpQ6/d0tO0hPri47ElWvIhtWl4NIYLlmLqdGys1MV5u/V69Jfjf/94JXFxGq6T+ffwK/XBfh3A24NQwXa2AeOi2OQREvB05AFT5YRWDfE4P40EqvDpCMLhTi7u8nRfiOhFDWmBHcW2kPtaUmttq7wFgXk8dhQqglRWKBE1IB41Bw7IS9zYRx/5Tlltshn/TerltI0DaibHiY/bJUs57SjwrodxregVmmdQv+2hcTb7AsJtPonrXt771
To: adipanfotoceramica@gmail.com
X-Entity-ID: u001.FEAzdjtty/WJJ/n7GjECyA==

--4b2c80fd3166b840258a19e843407a41ea5b0d7a481a9af82bcc95473c61
Content-Transfer-Encoding: quoted-printable
Content-Type: text/plain; charset=utf-8
Mime-Version: 1.0

Here=E2=80=99s how to deliver with AI.   Fiverr.=20
( https://links.announce.fiverr.com/ls/click?upn=3Du001.TWJuC2VN4aam7dFLwSK=
6BA7x8zAlKJDdEmizJpkYOrtgEsqhAseJsKujU3gSld80wafBJ9Zq-2FSzS0MP272QhFw-3D-3D=
0OJ7_uG012uDKiSxGki9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DM=
vvhC8Twns44GGxSS97TiByso-2BHXJUOzPbqrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2B=
V0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozM=
JszPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4=
XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82CgHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-=
2BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wb=
iTschoJ-2BVLsca64oWFsfJAq0D-2BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsT=
vlfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNkaPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHn=
B-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKEWXBMlzCSi60yR1GOlXlIYUtZ0YA0-2BgRa4SLJQL=
8xnXpjB1HVcod9XsSwf5p-2F7Jebm9qqnev8SpKsjEcG92zTKxOCgaaH45forkrWDW9OTuLmH93=
P3XYIP66bRk7QGHe3ZuT9MuU3Aqn6Qr8JFOLZJWY-3D ) Smart
Season ( https://links.announce.fiverr.com/ls/click?upn=3Du001.TWJuC2VN4aam=
7dFLwSK6BHqXH2nRDozap1pZqO62e2-2BpbdSPMVPFBTsv5zQG-2BIOHqfCX_uG012uDKiSxGki=
9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97T=
iByso-2BHXJUOzPbqrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJP=
M4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2=
F2vEQJfGj-2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R=
3Oe91o3xWMRIo82CgHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO=
8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oW=
FsfJAq0D-2BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOT=
XxNJiHmufgpN6aNkaPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7q=
Ckp4NZCpeXGqpJKEWQsnDVXKU90zjXWUJUfGK9AUrKHJxMfaXeE5smecIABL7OdyZ6xTmuO-2Fv=
otLWI2iBcG33Wwp-2FTuKQS95fiHlrJcFa2MkRF0DJcPNfM5F5MuBXZAcU6nBgk0tE0Ud-2FhBt=
8Kj0jWDiRDiPQZeerAp4h7E-3D ) =E2=80=98Tis the
season to be savvy! This year's shopping season could be
smoother, smarter, and even more successful.

Our hub is packed with clever checklists for tracking your
growth, eye-opening strategies to stay ahead of the trends, and
cutting-edge AI tools that do the heavy lifting.

We're here to help you put the most talked-about technology to
good use. Ready to outsmart the competition? Sell smarter
( https://links.announce.fiverr.com/ls/click?upn=3Du001.TWJuC2VN4aam7dFLwSK=
6BHqXH2nRDozap1pZqO62e2-2BpbdSPMVPFBTsv5zQG-2BIOHiFgj_uG012uDKiSxGki9dzRJ3x=
EOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2=
BHXJUOzPbqrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF=
10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJf=
Gj-2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3=
xWMRIo82CgHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMs=
kJy6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0=
D-2BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHm=
ufgpN6aNkaPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZC=
peXGqpJKEWdwpwLTO6L5OUBvth3vzuvEuYXL7DRTllrAZdVmcd6o12MrxcKTCyqIaAPSXfKbBhI=
ioW52q3CQpbMicO8ckUdwQY-2FBXI1UOzj3u1yqAp-2FphjcpXGZ3dQugixkQDTaA13VTN-2BLo=
x9J58uC705yWTK1s-3D )

Twitter=20
( https://links.announce.fiverr.com/ls/click?upn=3Du001.TWJuC2VN4aam7dFLwSK=
6BKF33-2BRvMn8su-2BZg0q267H7d7NLwkxIhQC8giZTj5x8rC9gHfCRWW08vf04vdC-2FD-2Bu=
-2FDxWpvD8vuwmktEaboxLLw5r-2B1kuutWmrO5ceCYmkbz2tQ_uG012uDKiSxGki9dzRJ3xEOl=
Uwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHX=
JUOzPbqrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10V=
j0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-=
2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWM=
RIo82CgHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy=
6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2=
BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufg=
pN6aNkaPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeX=
GqpJKEWXr5pYlUSyfz785xFVAS7cz7ua8imJRyR7UM1l2j4B-2FTxz5RWaHLN38H0p4iPvjZ1AZ=
51F-2FixkDZNymHl3twyEJt58Zwljed-2Fyw3hICTngItQCtpse6iJvhzSXUS6849DOVBCrDae2=
fhpmZ5x0nC1Ng-3D )
  Facebook=20
( https://links.announce.fiverr.com/ls/click?upn=3Du001.TWJuC2VN4aam7dFLwSK=
6BKF3is0nMk7-2FZlXloDK-2FgbGlBT7jmhX8pvjrjO91cs9-2FzOapnwfFfaywx61PGQXsdL-2=
B23pDu8fgeEH16tZjesYjtm-2FZ69TQFVBMzZ-2BTTy-2BRv3EAD_uG012uDKiSxGki9dzRJ3xE=
OlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2B=
HXJUOzPbqrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF1=
0Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfG=
j-2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3x=
WMRIo82CgHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMsk=
Jy6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D=
-2BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmu=
fgpN6aNkaPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCp=
eXGqpJKEWV8CMUv-2BlJHaqRxSEG-2B3lQt8k40dp1xpH-2BmAx4pi3tqrVWkrrnH-2B0wCDqPf=
lMNO2ovB6cF8IMYKmNzY9bDqRqWJBDm1N8mw-2FjjadaPibyTOQDRZy1ph7eo9aQWmH62jFH-2F=
KliT0VuI6Yh9DMotsOpNQ-3D )
  Pinterest=20
( https://links.announce.fiverr.com/ls/click?upn=3Du001.u0gdiNyXqP6Z13TaUet=
-2B4GirwvAaxG9jwCeIBXhORCuLMni-2BlTC5FATfKhaGgfzpLseeK73ib4-2FYfM8QgGE8F8Dd=
hPfCB3T2qKqP7w423KpnIZhfIE67aeILKUWmZgCSTOMW_uG012uDKiSxGki9dzRJ3xEOlUwl7Fa=
iWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHXJUOzPb=
qrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo=
7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP=
995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82C=
gHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3w=
nSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2BYLPki=
j6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNk=
aPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKE=
Wek8aPoMiOKQevsXtzlHVJRMSHoefijMQl-2BFjXBft30jDsGpb5uJDtKMAD2V61U-2BKBpb3GU=
6LehuVwhZHwNutH-2FtkMhx7gsgqvJsKW7WtDQL0IANsjPdILB0P3aQ02Sebo4bTr9xO5nqvDyn=
hzk5TuU-3D )
  LinkedIn=20
( https://links.announce.fiverr.com/ls/click?upn=3Du001.G8InBdZMyMLFosDO2eM=
XV62LFMBv0skBaZg4mgswt8FNk-2FgVRuEM6onS4QjMukZr2zNJ7hl-2FkG79AsA94P7AUlFXHo=
hWoKZ0BjA1FavMF-2BSSLfp-2BBilgg3NuagQIjkn7-2FoBAcyZVQmkQMJKoKujW8A-3D-3DAdY=
F_uG012uDKiSxGki9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvh=
C8Twns44GGxSS97TiByso-2BHXJUOzPbqrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0S=
KSSZnf9e67eZJqJPM4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJsz=
PU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlT=
jkKBAYB7C3k5jK1R3Oe91o3xWMRIo82CgHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ=
0emktiO91HrffGMO8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTs=
choJ-2BVLsca64oWFsfJAq0D-2BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlf=
iWVVUW2hKHk2pNOTXxNJiHmufgpN6aNkaPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2=
BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKEWUTnGnHxeH-2B9Xa2FOcFpizJ9p-2B55Ftm5dSWZ4P0=
nwJ-2BQDRqDbKBi5FnJqfaQy7hXpSMqBuQIrt1rc61yi6Nx5V71e6J483BARstnFvSLyibV5qiN=
BSJXWMYodCGO1WevB78ashf6VTlmKe48pzjWfc4-3D )
  Instagram=20
( https://links.announce.fiverr.com/ls/click?upn=3Du001.cVIN5xF103TlrXLUItd=
QgK94a3FrSetyo1Trw6RZOJTwrFovER-2B9jtaTJz2lWmkPK2KFsF83WtRJ-2F973OiaGdthxuO=
oucZCvYqb9pPRSqyuZ32-2FPMeH224L3G8uUBkG08BS5_uG012uDKiSxGki9dzRJ3xEOlUwl7Fa=
iWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHXJUOzPb=
qrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo=
7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP=
995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82C=
gHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3w=
nSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2BYLPki=
j6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNk=
aPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKE=
WaTo3YiMAvaveWngjoGblFZgbAetdyQScgw89E1CzG3-2BjniduorNrS7knduYV6XY-2BlA2o6V=
GqpsHdqyD5bYUMB7vkHnA1SX8O6TfDumvSk4VOBxVG-2FrgUUPyuZa7VZ-2FJZy3PRZOQqAsyEq=
asP89jjgM-3D )


Privacy Policy ( https://links.announce.fiverr.com/ls/click?upn=3Du001.TWJu=
C2VN4aam7dFLwSK6BJy6VfV63QEkORmMl-2BePSY45U2zWOXwTMiu8r1mVp8qFDyQk_uG012uDK=
iSxGki9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GG=
xSS97TiByso-2BHXJUOzPbqrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67=
eZJqJPM4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2Bi=
Dchl-2F2vEQJfGj-2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3=
k5jK1R3Oe91o3xWMRIo82CgHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91H=
rffGMO8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLs=
ca64oWFsfJAq0D-2BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKH=
k2pNOTXxNJiHmufgpN6aNkaPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2Bq=
JKuv7qCkp4NZCpeXGqpJKEWaXJr7FQw3N7KK5pTBeLRUGRkI5GBubftp-2FHzyoyIkDPaHKyzqq=
dQRoS-2F0M15Vnw5UpEFxbTgwHRwzRL5Q1t8-2FrealAOTkOMhNngQFixxEecHz6ujvKGxCiPKs=
wRlrxy7iXeZOIiicmEiOBJaXLC6JA-3D ) |
Support ( https://links.announce.fiverr.com/ls/click?upn=3Du001.k8KsZlkjNMf=
xdkArgyC4jyfHXDLcvfVNVdkPel2UB9qcjk8DmEH9Ez58M-2BFPK0mMvhjI_uG012uDKiSxGki9=
dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97Ti=
Byso-2BHXJUOzPbqrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM=
4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F=
2vEQJfGj-2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3=
Oe91o3xWMRIo82CgHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8=
NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWF=
sfJAq0D-2BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTX=
xNJiHmufgpN6aNkaPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qC=
kp4NZCpeXGqpJKEWXoUzaZhp5KzavlbME5XZeMWZVKUPxCyO5pYeWu7MqCxSgrpUBRg-2Fvz1Oi=
maglU-2B-2BkT1-2BSn4pTPG9g-2B9x4JMD0l4FoU6hpHL856da-2FPduXn2EU5AxBbCSc2WS53=
eCL-2B2XiFyOD6CX9FXKGpqlrgd0Qo-3D ) | Invite Friends=20
( https://links.announce.fiverr.com/ls/click?upn=3Du001.TWJuC2VN4aam7dFLwSK=
6BNIw0kyKdeNEYMnel2pDQSP6Hsr8gr63UaU-2BTLleXSkRkUhYqs90gUXevoR-2BL2UY6evysZ=
Qe8UTC-2FtkTdr5Ro8yaDe6-2FUlvv-2FX-2FJ6LrhJJ1vRC7kf522FkAs67pj4auEPg-3D-3DZ=
UXb_uG012uDKiSxGki9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMv=
vhC8Twns44GGxSS97TiByso-2BHXJUOzPbqrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV=
0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJ=
szPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4X=
lTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82CgHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2=
BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbi=
TschoJ-2BVLsca64oWFsfJAq0D-2BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTv=
lfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNkaPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB=
-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKEWQsnDVXKU90zjXWUJUfGK9C12Ny1RXqCryn-2B5n9=
KdMEH9IHko5RD73T-2BdBELQFPJmLqnDSiqXAUoFlk-2BvlQfDkiUraTgguIrWoEDhmR5-2Fq-2=
F7LFB6k-2BivG40UiNTrXhD06B2erzU-2FkOQw0VUbJLD4Nrw-3D )
 | Get Inspired=20
( https://links.announce.fiverr.com/ls/click?upn=3Du001.TWJuC2VN4aam7dFLwSK=
6BCZti4ea-2BGWJPk4H6Qlhxj7tayXONrbLQ6XymHCnzv-2BOGH4lP-2FASgjPkxRopwCUqYH13=
iKAMa4pzshcjYSakX0Mrv4YjHIGG9vISuKgfMXMz3yQJ_uG012uDKiSxGki9dzRJ3xEOlUwl7Fa=
iWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHXJUOzPb=
qrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo=
7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP=
995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82C=
gHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3w=
nSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2BYLPki=
j6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNk=
aPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKE=
WQsnDVXKU90zjXWUJUfGK9AVhfQVs6bVFc0MEXUGYOpMvBHagVYo1PoNRfT0whPc203M5oPIclT=
K-2BSte1Pe42iuLbLkyimRyb7QCiPSkowJ2INGtGxlRT4N3zccd1-2F3LcSGFMt28O-2B0fm6Ah=
ERO-2BkDU-3D )


This email was sent to you by Fiverr International Ltd.
You are receiving this email because you signed up for
 Fiverr.

If you wish to unsubscribe from all future emails, please click
here ( https://links.announce.fiverr.com/ls/click?upn=3Du001.TWJuC2VN4aam7d=
FLwSK6BHN4kGLQi8HVS5ggjnuAiHdDw7pbntTL3sYzQE08CA8m0VYM55NDluP-2BApkIk5hndVt=
eWCLpTv1hw9WFEZDOcJJOaV2oOS6H9WUOWFOCEUKi-2F5n1iQIH6oON07W7vrTZN37VfXQ0RvFI=
MSEpUcu6HkMCPchWOkQGXj5NPkgqbemL4N5BUGxfmDXhv2n7GNRVjvKNn-2BgnHxesb-2FoTT2Q=
hJdYXMromP5h7fVm15FhuyAQoX3a0XkDdSRzMNJeZZGrlv5fxyvZM7d9F9mfyDEAzQtTtZbSeMW=
CnU1sL0wlsN6AzlgoCa9Yt2E7L0fmW3ZuAH10-2Bns-2B6-2BFPJdBQwwJwbPZU1hRZ-2Furo8H=
ZkyV06Fd3ovXPgpkdc-2Bs5eRKET9aqeGSLbRfdolAJb-2B5E7914-2B4fML4kXY4RA5q3LJwTg=
Ox4-2Bv4YLdCeD8wapI7R8Vp102CeSNEhM6kLlOHq9ai5CMe9noP6iv1POaPt2OUZL2E2S3bpRF=
gPXaqKysXwfR6h7cUm-2FhQNnvJ9mnG-2BC7-2FHKI26uX1jfiKYlsughIAsD0UT9aCWr6ntUs5=
YMoaGMF9CYpP3v3giaHC-2FLqozlLBlLqU0Ik1h13m5DcKdn0MkUPfiaQOtjT2JRmXXDmwq7Deo=
KAkqZwoVUWPMx-2FHtSztvODbBeHproB-2BaimvCzsv9qWSQwA39V2Fp-2F5EjycZFkiPwyMf0E=
p5WdLQyx5jhff-2FV91zW4I-3DCMow_uG012uDKiSxGki9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5N=
LJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHXJUOzPbqrOodWRKpLZivK=
PvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo7p4X-2FjtH5tJj=
pM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP995qGj4oNlGV2e=
Sxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82CgHx2O62XeyLdbl=
A-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYR=
y555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2BYLPkij6RK4UPiSO3PKV=
rIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNkaPvmTxLOISXsKR=
Gqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKEWQsnDVXKU90zjX=
WUJUfGK9DUzUwC0rH1pkOaZhHvFb9HgmWZRY0yU7mypah-2B3MoqTMB-2FeUrk8l6WRq5TFEuMI=
f-2FsEdTukr1mSIC0SQekCHGU-2B1mWPF81uq0Cbk4gV5U1WFtVYQ-2F3DXBTZsZTKFxcFVo-3D=
 ).

Fiverr International Ltd. | 26 Mercer St. | New York, NY 10013,
USA

Apple Store=20
( https://links.announce.fiverr.com/ls/click?upn=3Du001.TWJuC2VN4aam7dFLwSK=
6BGFnA51R0-2FgHS7HTpvECFellnzC7yvXcyJWVHLFwwWV0-2FNxowR0FdqJ7b4gTfd9FcIxm9C=
QYuhYrFwuovjQ42JVpTHD93vWh4HN7GWA5MknrXifFkCRUJODFOXhGC5yn6w-3D-3DDjHF_uG01=
2uDKiSxGki9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns=
44GGxSS97TiByso-2BHXJUOzPbqrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf=
9e67eZJqJPM4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb=
-2BiDchl-2F2vEQJfGj-2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAY=
B7C3k5jK1R3Oe91o3xWMRIo82CgHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emkti=
O91HrffGMO8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2=
BVLsca64oWFsfJAq0D-2BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW=
2hKHk2pNOTXxNJiHmufgpN6aNkaPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8=
-2BqJKuv7qCkp4NZCpeXGqpJKEWQsnDVXKU90zjXWUJUfGK9Bcu0FiroUOv22Qj1y9vl2Y2Pllk=
h464I9jSVtXepn2NO40f1ynwIKKOjxo2l58JNsmZEOKFUcZu-2Bqv5ZWRdgd2sSF5bJYTFRAIvH=
zp4dJTBZ4sE4qBhqteuZ4J93dH-2BKY-3D )
  Google Store=20
( https://links.announce.fiverr.com/ls/click?upn=3Du001.TWJuC2VN4aam7dFLwSK=
6BIQOUy-2FOVR6aWqdX89KJtdL-2Fz9kRKDoZMQXGd4DPGYggSW0Ny-2FYkteywyg5DmVodXlY4=
yhH0LYbBws-2BcKhp0it1JWEHz3tfPDAui0GyQ6YIsL23MAMWIK7j2vRqGDPROK26JbjiW1WRta=
NSL2FvzB4E-3DaTdf_uG012uDKiSxGki9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA=
-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHXJUOzPbqrOodWRKpLZivKPvBvPr5TrIYtS=
x-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXy=
t5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5nn=
cpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82CgHx2O62XeyLdblA-2Bi-2FY1UC0=
L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6IM=
gEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR6=
cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNkaPvmTxLOISXsKRGqznjqdo1dX00=
pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKEWQsnDVXKU90zjXWUJUfGK9AwgwX=
0uFy6sF-2FkJKHIhkUWwad6A8f97wBCJK77E-2BAmdO8HNwlwKijvVOL7tAihVcibbpvjvG3-2B=
KQmArG6wXbZtgx63Y-2BP7kGPeXUy9TW-2F2-2FmzfYdV7SezDwcyQJEtSR6E-3D )


  - - - - -
- - - - - - - - - - - - - - - - - -
--4b2c80fd3166b840258a19e843407a41ea5b0d7a481a9af82bcc95473c61
Content-Transfer-Encoding: quoted-printable
Content-Type: text/html; charset=utf-8
Mime-Version: 1.0

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.=
w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns=3D"http://www.w3.org/1999/xhtml" xmlns:v=3D"urn:schemas-microso=
ft-com:vml" xmlns:o=3D"urn:schemas-microsoft-com:office:office" lang=3D"EN"=
 style=3D"width: 100%;" xml:lang=3D"EN">
<head>

            <!--[if gte mso 15]>
            <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            <style type=3D"text/css"> body,table tr,table td,a, span,table.=
MsoNormalTable {  font-family:'Open Sans', Helvetica, sans-serif !important=
;  }</style>
            <![endif]-->
         =20
<title></title>
<meta http-equiv=3D"Content-Type" content=3D"text/html; charset=3Dutf-8">
<meta name=3D"x-apple-disable-message-reformatting">
<meta http-equiv=3D"X-UA-Compatible" content=3D"IE=3Dedge">
<meta name=3D"viewport" content=3D"width=3Ddevice-width, initial-scale=3D1.=
0 ">
<meta name=3D"format-detection" content=3D"telephone=3Dno">
=20

<style>@font-face {
font-family: 'Helvetica'; font-style: normal; font-weight: 400; src: url('h=
ttps://fonts.gstatic.com/l/font?kit=3DJIAxUVNqfH9WuVQQRM4zVxOi&amp;skey=3D2=
2efecd2bc0e2cb0&amp;v=3Dv9') format('truetype');
}
@font-face {
font-family: 'Helvetica'; font-style: normal; font-weight: 700; src: url('h=
ttps://fonts.gstatic.com/l/font?kit=3DJIA0UVNqfH9WuVQQRM477DayEhEn&amp;skey=
=3Dc9794b4fcbed8443&amp;v=3Dv9') format('truetype');
}
.ReadMsgBody {
width: 100%; background-color: #ffffff;
}
.ExternalClass {
width: 100%; background-color: #ffffff;
}
.ExternalClass {
line-height: 100%;
}
img {
display: block !important; overflow: hidden !important; border: 0 !importan=
t; outline: none !important;
}
body {
-ms-text-size-adjust: 100% !important; margin: 0 auto !important; padding: =
0 !important; -webkit-text-size-adjust: 100% !important; -webkit-font-smoot=
hing: antialiased !important;
}
@media only screen and (max-width:600px) {
  .em_main_table {
    width: 100% !important;
  }
  .em_wrapper {
    width: 100% !important; max-width: 100% !important; height: auto !impor=
tant;
  }
  .em_hide {
    display: none !important;
  }
  .em_align_center {
    text-align: center !important;
  }
  .em_pad_top {
    padding-top: 20px !important;
  }
  .em_side_space {
    padding-left: 20px !important; padding-right: 20px !important;
  }
  .em_wrapper_two {
    width: 100% !important; max-width: 100% !important; display: block;
  }
  .em_bg_center {
    background-position: center !important;
  }
  .em_full_width {
    width: 100% !important; height: auto !important; max-width: 100% !impor=
tant;
  }
  u+.em_body .em_full_wrap {
    width: 100vw !important;
  }
}
@media only screen and (min-device-width: 375px) and (max-device-width: 413=
px) {
  .em_main_table {
    min-width: 375px !important;
  }
}
</style>
</head>
<body style=3D"-ms-text-size-adjust: 100% !important; -webkit-text-size-adj=
ust: 100% !important; -webkit-font-smoothing: antialiased !important; margi=
n: 0 auto; padding: 0;"><img src=3D"https://links.announce.fiverr.com/wf/op=
en?upn=3Du001.k8NllqpKunsK3JV4Bzxr2TjaT2qFsw1yEBM-2F-2BMg8Oj8Cy8-2BgUXP-2B7=
QibWLd2dylwxfr2XdiTiCsYR8cL3rzTTFfJ65tmU2SV85IgpTy3opMuR5R56LFPTSN49UcThsl9=
393VhykUM6JJpN88mKgXWRc091I-2FIDDzhGAybSaCutHOIomEKfI1Q4Ido4pawPLoX6MjqOo9W=
smZWmB-2BB8FstPPjeEmFRNZU09y-2Bht4FirNXzicq00IXpQg-2Fl449NDgLqm2-2BEjxLOgcV=
u1iOQHwYHhE3OhVSkdrXlzRU9-2BrcEWUUYB-2FjMB-2FPRcdFXG221l86aMx9cm81L7jhm2Bj4=
9eFo7-2FOIY69ypI8mETjd87xnBDVKGJZHMeM9smlCBEjjFkqDR2vFL7r6woRGL7C7KwyuZF3NE=
MigaAGmkoZjBGFcGy2N6a0FNEhJp92JtQ6sETUMATckS6KFnm9EMv0BN0s2CGhUHtcDEGRZ-2F-=
2FTyAERb6TZEsK45AjY3v-2BT7j-2F6Gm8xBqfD-2B8lRJzMYimsbYuI4YEqge5qTYuV-2B5X69=
kJX2uDh2z-2Fib6rUCAa0ioJCx8QK-2F43BbryH8yQTFAMPFi-2B14V8AikGpA1LlMQ7D4zoj1j=
UjLxHuN4BrIQ-2F7UWSWcKFLZHy3Y7f9s0gTHqC4gXQ8BhBYbs2YUWZ46aAbSVlrNSEX5QJhBr5=
FTOG4Z0Fr5EAualzF0eMg1qH9Ob0xzIo-2FUSWwvRHONW1HQtcgKlCNqMQY-3D" alt=3D"" wi=
dth=3D"1" height=3D"1" border=3D"0" style=3D"height:1px !important;width:1p=
x !important;border-width:0 !important;margin-top:0 !important;margin-botto=
m:0 !important;margin-right:0 !important;margin-left:0 !important;padding-t=
op:0 !important;padding-bottom:0 !important;padding-right:0 !important;padd=
ing-left:0 !important;"/>
<div style=3D"display:none !important;visibility:hidden;mso-hide:all;font-s=
ize:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:=
0;overflow:hidden;">Here=E2=80=99s how to deliver with AI.</div>
<span class=3D"preheader" style=3D"font-size: 1px; color: #eeeeee; display:=
 none !important; border-collapse: collapse; mso-line-height-rule: exactly;=
"> &nbsp;</span><table class=3D"em_full_wrap" width=3D"100%" border=3D"0" c=
ellspacing=3D"0" cellpadding=3D"0" align=3D"center" style=3D"border-spacing=
: 0; border-collapse: collapse; mso-table-lspace: 0px; mso-table-rspace: 0p=
x; margin: 0 auto;" bgcolor=3D"#eeeeee">
          <tr>
           <td align=3D"center" valign=3D"top" style=3D"border-collapse: co=
llapse; mso-line-height-rule: exactly;">
            <table align=3D"center" class=3D"em_main_table" width=3D"600" b=
order=3D"0" cellspacing=3D"0" cellpadding=3D"0" style=3D"table-layout: fixe=
d; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0px; mso=
-table-rspace: 0px; margin: 0 auto;">
             <tr>
              <td height=3D"20" class=3D"em_hide" style=3D"line-height: 1px=
; font-size: 1px; border-collapse: collapse; mso-line-height-rule: exactly;=
">&nbsp;</td>
             </tr>
             <tr>
              <td bgcolor=3D"#ffffff" style=3D"box-shadow: 1px 1px 10px 1px=
 #f1f1f1; border-collapse: collapse; mso-line-height-rule: exactly;">
               <table width=3D"100%" border=3D"0" cellspacing=3D"0" cellpad=
ding=3D"0" style=3D"border-spacing: 0; border-collapse: collapse; mso-table=
-lspace: 0px; mso-table-rspace: 0px; table-layout: auto; margin: 0 auto;">
                <tr>
                 <td bgcolor=3D"#ffffff" style=3D"border-radius: 5px 5px 0p=
x 0px; border-collapse: collapse; mso-line-height-rule: exactly;">
                  <table width=3D"100%" border=3D"0" cellspacing=3D"0" cell=
padding=3D"0" id=3D"templogo" style=3D"border-spacing: 0; border-collapse: =
collapse; mso-table-lspace: 0px; mso-table-rspace: 0px; table-layout: auto;=
 margin: 0 auto;">
                   <tr>
                    <td width=3D"40" class=3D"em_hide" style=3D"border-coll=
apse: collapse; mso-line-height-rule: exactly;">&nbsp;</td>
                    <td class=3D"em_side_space" align=3D"left" id=3D"logo" =
style=3D"padding-top: 16px; padding-bottom: 16px; border-collapse: collapse=
; mso-line-height-rule: exactly;">
                    <a href=3D"https://links.announce.fiverr.com/uni/ls/cli=
ck?upn=3Du001.TWJuC2VN4aam7dFLwSK6BA7x8zAlKJDdEmizJpkYOrtgEsqhAseJsKujU3gSl=
d80bHrdcWP7-2F0GSKgPDXeaoy-2FmSNITk-2BedOon3o-2FbHPlSjo7FbIpEOV3QndiPRpRtqD=
-2FzTgQz36gIdI8rFqXo0lEoOoUnlPrqkU-2FqahTGOoUOcbUJoz2TCOgAZLSWHjqSp1ye2dMF0=
qIbjf4zqEFdpQlCJkQ08FxpBgbRvSCPDKgyU-3DUkdZ_uG012uDKiSxGki9dzRJ3xEOlUwl7Fai=
WJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHXJUOzPbq=
rOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo7=
p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP9=
95qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82Cg=
Hx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3wn=
Ss0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2BYLPkij=
6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNka=
PvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKEW=
Wm0wzAwrLH-2BTDdr-2BmZ-2BqlyQtK6C0VE-2FVEt7DqBYeM2T3Fot8iiDHlwg-2FVzIXo8lfG=
xXrJ5QFcv2Pnr23oEaEh-2B0fd9DhijSPyOKCwqqBz7YuLet4leh-2B6UKlnzZtnyEtsRH96Rv6=
LCorMucOorkhcM-3D" universal=3D"true" target=3D"_blank" style=3D"text-decor=
ation: none !important; border-collapse: collapse; mso-line-height-rule: ex=
actly;">
                      <img class=3D"logo" src=3D"https://braze-images.com/a=
ppboy/communication/assets/image_assets/images/6018272483566877ab3eceb8/ori=
ginal.png?1612195620" width=3D"80" height=3D"24" style=3D"max-width: 80px; =
display: block !important; overflow: hidden !important; outline: none !impo=
rtant; border-width: 0;" alt=3D"Fiverr.">
                    </a>
                  </td>
                    <td width=3D"36" class=3D"em_hide" style=3D"border-coll=
apse: collapse; mso-line-height-rule: exactly;">&nbsp;</td>
                   </tr>
                  </table>
                  <table width=3D"100%" border=3D"0" cellspacing=3D"0" cell=
padding=3D"0" id=3D"bannerImg" style=3D"border-spacing: 0; border-collapse:=
 collapse; mso-table-lspace: 0px; mso-table-rspace: 0px; table-layout: auto=
; margin: 0 auto;">
                   <tr>
                    <td style=3D"border-collapse: collapse; mso-line-height=
-rule: exactly;">
                     <a href=3D"https://links.announce.fiverr.com/ls/click?=
upn=3Du001.TWJuC2VN4aam7dFLwSK6BHqXH2nRDozap1pZqO62e28rzB3wb7scSoNqYE4JYET4=
ZSdiPsu4-2Fr09SCs1jLWdlUS1DNXyUNcd5-2F2tQEBAyOPrH0h-2BUAKP-2FGl0zLYyXaBJNMx=
75JSECZIw9nQgUdFrjtvbMVjO4DdlqDrH9WBxqqLtsYJFRHtCDiz5AtDKtqxxeoyf9CSZkcs4Gk=
woDp8ZFA-3D-3D1_HV_uG012uDKiSxGki9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKG=
A-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHXJUOzPbqrOodWRKpLZivKPvBvPr5TrIYt=
Sx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxX=
yt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5n=
ncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82CgHx2O62XeyLdblA-2Bi-2FY1UC=
0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6I=
MgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR=
6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNkaPvmTxLOISXsKRGqznjqdo1dX0=
0pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKEWWm0wzAwrLH-2BTDdr-2BmZ-2B=
qlwhQ2xm8bgbeWFjH55R4liEe-2BX79-2FSy1OwGU14TUuCumG-2FxMHVlfXUKkoi8RSG2N95Hi=
4LnOwGX9fGRY445R-2BbZx-2BDx9hHboFOZXfKRrKrIzOLyIVz3axCRJ9BIm-2BBJElg-3D" ta=
rget=3D"_blank" style=3D"text-decoration: none !important; border-collapse:=
 collapse; mso-line-height-rule: exactly;">
                      <img src=3D"https://braze-images.com/appboy/communica=
tion/assets/image_assets/images/66ec1aff54fa590064e92bda/original.png?17267=
49439" alt=3D"Smart Season" aria-hidden=3D"true" width=3D"600" height=3D"28=
8" class=3D"em_full_width" style=3D"display: block !important; max-width: 6=
00px; width: 100%; overflow: hidden !important; outline: none !important; b=
order-width: 0;" border=3D"0">
                     </a>
                    </td>
                   </tr>
                  </table>
                  <table width=3D"100%" border=3D"0" cellspacing=3D"0" cell=
padding=3D"0" id=3D"titletext" style=3D"border-spacing: 0; border-collapse:=
 collapse; mso-table-lspace: 0px; mso-table-rspace: 0px; table-layout: auto=
; margin: 0 auto;">
                   <tr>
                    <td width=3D"40" class=3D"em_hide" style=3D"border-coll=
apse: collapse; mso-line-height-rule: exactly;">&nbsp;</td>
                    <td class=3D"em_side_space" style=3D"font-family: 'Helv=
etica', Avenir, Arial, sans-serif; padding-top: 32px; font-size: 36px; colo=
r: #222325; font-weight: 700; line-height: 40px; border-collapse: collapse;=
 mso-line-height-rule: exactly;" align=3D"left"><div>=E2=80=98Tis the seaso=
n to be savvy!</div></td>
                    <td width=3D"36" class=3D"em_hide" style=3D"border-coll=
apse: collapse; mso-line-height-rule: exactly;">&nbsp;</td>
                   </tr>
                  </table>
                  <table width=3D"100%" border=3D"0" cellspacing=3D"0" cell=
padding=3D"0" style=3D"border-spacing: 0; border-collapse: collapse; mso-ta=
ble-lspace: 0px; mso-table-rspace: 0px; table-layout: auto; margin: 0 auto;=
">
                   <tr>
                    <td class=3D"em_side_space mainText" style=3D"font-fami=
ly: 'Helvetica', Avenir, Arial, sans-serif; font-size: 16px; color: #404145=
; line-height: 26px; font-weight: 400; border-collapse: collapse; mso-line-=
height-rule: exactly; padding: 20px 40px;" align=3D"left">This year's shopp=
ing season could be smoother, smarter, and even more successful.<br><br><di=
v>Our hub is packed with clever checklists for tracking your growth, eye-op=
ening strategies to stay ahead of the trends, and cutting-edge AI tools tha=
t do the heavy lifting.<br><br>
</div>
<div>We're here to help you put the most talked-about technology to good us=
e. Ready to outsmart the competition?&nbsp;</div>
</td>
                                  </tr>
                   <tr>
                    <td class=3D"em_side_space" style=3D"padding-bottom: 20=
px; padding-top: 16px; border-collapse: collapse; mso-line-height-rule: exa=
ctly;">
                     <table border=3D"0" cellspacing=3D"0" cellpadding=3D"0=
" align=3D"center" style=3D"border-spacing: 0; border-collapse: collapse; m=
so-table-lspace: 0px; mso-table-rspace: 0px; table-layout: auto; margin: 0 =
auto;">
                      <tr>
                       <td class=3D"mainBtn" valign=3D"middle" height=3D"45=
" style=3D"padding-left: 30px; padding-right: 30px; font-family: 'Helvetica=
', Avenir, Arial, sans-serif; font-size: 15px; border-radius: 5px; color: #=
ffffff; font-weight: 700; border-collapse: collapse; mso-line-height-rule: =
exactly;" bgcolor=3D"#1DBF73" align=3D"center">
                        <a href=3D"https://links.announce.fiverr.com/ls/cli=
ck?upn=3Du001.TWJuC2VN4aam7dFLwSK6BHqXH2nRDozap1pZqO62e28rzB3wb7scSoNqYE4JY=
ET4ZSdiPsu4-2Fr09SCs1jLWdlUS1DNXyUNcd5-2F2tQEBAyOPrH0h-2BUAKP-2FGl0zLYyXaBJ=
NMx75JSECZIw9nQgUdFrjtvbMVjO4DdlqDrH9WBxqqLtsYJFRHtCDiz5AtDKtqxxeoyf9CSZkcs=
4GkwoDp8ZFA-3D-3DaL5r_uG012uDKiSxGki9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9=
VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHXJUOzPbqrOodWRKpLZivKPvBvPr5Tr=
IYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5=
vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP995qGj4oNlGV2eSxy5Gf5QN=
w5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82CgHx2O62XeyLdblA-2Bi-2FY=
1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy555OLjza=
f6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2BYLPkij6RK4UPiSO3PKVrIW6-2FlR=
znR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNkaPvmTxLOISXsKRGqznjqdo1=
dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKEWWm0wzAwrLH-2BTDdr-2BmZ=
-2BqlygNrATIlthCLjxD79uvPH8hvK8SjhLJj6RJa-2BUaxbUiHn7oXbYI1-2FaQ9m5WJvkuIiR=
k7VzMWHmWDfo8VndJc-2Fqcph61yJt3Totw63DRfl-2BL6wZQ-2FYRyeJYnjsxaM1IVKM-3D" t=
arget=3D"_blank" style=3D"text-decoration: none !important; color: #ffffff;=
 display: block; line-height: 45px; border-collapse: collapse; mso-line-hei=
ght-rule: exactly;">Sell smarter</a>
                       </td>
                      </tr>
                     </table>
                    </td>
                        </tr>
                  </table>
                  <table bgcolor=3D"#ffffff" width=3D"100%" border=3D"0" ce=
llspacing=3D"0" cellpadding=3D"0" style=3D"border-spacing: 0; border-collap=
se: collapse; mso-table-lspace: 0px; mso-table-rspace: 0px; table-layout: a=
uto; margin: 0 auto;">
                   <tr>
                    <td height=3D"48" style=3D"line-height: 1px; font-size:=
 1px; border-collapse: collapse; mso-line-height-rule: exactly;">&nbsp;</td=
>
                   </tr>
                  </table>
                 =20


<table bgcolor=3D"#eeeeee" width=3D"100%" border=3D"0" cellspacing=3D"0" ce=
llpadding=3D"0" id=3D"footer" style=3D"border-spacing: 0; border-collapse: =
collapse; mso-table-lspace: 0px; mso-table-rspace: 0px; table-layout: auto;=
 margin: 0 auto;">
                   <tr>
                    <td width=3D"35" class=3D"em_hide" style=3D"border-coll=
apse: collapse; mso-line-height-rule: exactly;">&nbsp;</td>
                    <td valign=3D"top" class=3D"em_side_space" style=3D"bor=
der-collapse: collapse; mso-line-height-rule: exactly;">
                     <table width=3D"100%" border=3D"0" cellspacing=3D"0" c=
ellpadding=3D"0" style=3D"border-spacing: 0; border-collapse: collapse; mso=
-table-lspace: 0px; mso-table-rspace: 0px; table-layout: auto; margin: 0 au=
to;">
                      <tr>
                       <td height=3D"28" style=3D"line-height: 1px; font-si=
ze: 1px; border-collapse: collapse; mso-line-height-rule: exactly;">&nbsp;<=
/td>
                      </tr>
                      <tr>
                       <td style=3D"font-family: 'Helvetica', Avenir, Arial=
, sans-serif; font-size: 12px; color: #818181; line-height: 18px; font-weig=
ht: 400; border-collapse: collapse; mso-line-height-rule: exactly;" align=
=3D"center">
                        <meta http-equiv=3D"Content-Type" content=3D"text/h=
tml; charset=3DUTF-8">
<meta http-equiv=3D"Content-Type" content=3D"text/html; charset=3DUTF-8">
<title></title>

<table style=3D"width: 100%; text-align: center; border-spacing: 0; border-=
collapse: collapse; mso-table-lspace: 0px; mso-table-rspace: 0px; table-lay=
out: auto; margin: 0 auto;">
=09<tbody>
=09=09<tr>
=09=09=09<td align=3D"center" class=3D"center" style=3D"border-collapse: co=
llapse; mso-line-height-rule: exactly; padding: 10px 10px 25px;">
<!--Twitter--><a href=3D"https://links.announce.fiverr.com/ls/click?upn=3Du=
001.TWJuC2VN4aam7dFLwSK6BKF33-2BRvMn8su-2BZg0q267H7d7NLwkxIhQC8giZTj5x8rC9g=
HfCRWW08vf04vdC-2FD-2Bu-2FDxWpvD8vuwmktEaboxLLw5r-2B1kuutWmrO5ceCYmkbqNtf_u=
G012uDKiSxGki9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8T=
wns44GGxSS97TiByso-2BHXJUOzPbqrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSS=
Znf9e67eZJqJPM4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-=
2Fb-2BiDchl-2F2vEQJfGj-2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkK=
BAYB7C3k5jK1R3Oe91o3xWMRIo82CgHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0em=
ktiO91HrffGMO8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTscho=
J-2BVLsca64oWFsfJAq0D-2BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWV=
VUW2hKHk2pNOTXxNJiHmufgpN6aNkaPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS=
9m8-2BqJKuv7qCkp4NZCpeXGqpJKEWWm0wzAwrLH-2BTDdr-2BmZ-2BqlzB1j23HRNSvHnU0Irz=
e3Z9ASrqNdneUBBhnhR6SroZRldnddCTF16o9x15Cq6N2WfTLVdIhnTZrP3qKY0yKTtCaagJOwC=
X3kSdSorVz5moF16VKhT235tLVIvM0tm03FY-3D" style=3D"display: inline-block; te=
xt-decoration: none !important; border-collapse: collapse; mso-line-height-=
rule: exactly; margin: 0px;"><img alt=3D"Twitter" height=3D"40" src=3D"http=
s://appboy-images.com/appboy/communication/assets/image_assets/images/60335=
97de16e171ec0de07a5/original.png?1613977981" style=3D"width: 40px; height: =
40px; display: block !important; overflow: hidden !important; outline: none=
 !important; border-width: 0;" width=3D"40"></a> <!--Facebook--> <a href=3D=
"https://links.announce.fiverr.com/ls/click?upn=3Du001.TWJuC2VN4aam7dFLwSK6=
BKF3is0nMk7-2FZlXloDK-2FgbGlBT7jmhX8pvjrjO91cs9-2FzOapnwfFfaywx61PGQXsdL-2B=
23pDu8fgeEH16tZjesYjtm-2FZ69TQFVBMzZ-2BTTy-2BRvk6ev_uG012uDKiSxGki9dzRJ3xEO=
lUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BH=
XJUOzPbqrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10=
Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj=
-2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xW=
MRIo82CgHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJ=
y6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-=
2BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmuf=
gpN6aNkaPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpe=
XGqpJKEWWm0wzAwrLH-2BTDdr-2BmZ-2BqlzxN4kjFtrgJ7dxgBWuwW3oUkauwj9ZNrABGpFwWF=
sCW4Hrfkm1kPpL70eWzv6t6nJSf3MgXqB7KCAjE6ekPs6vp7b-2B-2FWttj4C97cQ7Ae49KwYuK=
cVNk88Rbuv2dsLaFxA-3D" style=3D"display: inline-block; text-decoration: non=
e !important; border-collapse: collapse; mso-line-height-rule: exactly; mar=
gin: 0px;"> <img alt=3D"Facebook" height=3D"40" src=3D"https://appboy-image=
s.com/appboy/communication/assets/image_assets/images/6033596e141af42e11eb9=
011/original.png?1613977966" style=3D"width: 40px; height: 40px; display: b=
lock !important; overflow: hidden !important; outline: none !important; bor=
der-width: 0;" width=3D"40"></a> <!--Pinterest--> <a href=3D"https://links.=
announce.fiverr.com/ls/click?upn=3Du001.u0gdiNyXqP6Z13TaUet-2B4GirwvAaxG9jw=
CeIBXhORCuLMni-2BlTC5FATfKhaGgfzpLseeK73ib4-2FYfM8QgGE8F8DdhPfCB3T2qKqP7w42=
3KpnIZhfIE67aeILKUWmZgCS5Z96_uG012uDKiSxGki9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJ=
APq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHXJUOzPbqrOodWRKpLZivKPv=
BvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM=
7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP995qGj4oNlGV2eSx=
y5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82CgHx2O62XeyLdblA-=
2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy5=
55OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2BYLPkij6RK4UPiSO3PKVrI=
W6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNkaPvmTxLOISXsKRGq=
znjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKEWWHutFvCz45X2GMz=
2BNmPKLNuVs-2Bg-2FICUUg4OgxM4YPvdAcaatY0X4bN1pKphLV4Bn0VaRaUqdBarn4bRCI6arw=
i7fXdy6Wvg-2Boeu-2FdCY70437d1wE1erOHtYAoW82KLSYYQiX1KWOTM9vlJz544x-2Fs-3D" =
style=3D"display: inline-block; text-decoration: none !important; border-co=
llapse: collapse; mso-line-height-rule: exactly; margin: 0px;"> <img alt=3D=
"Pinterest" height=3D"40" src=3D"https://appboy-images.com/appboy/communica=
tion/assets/image_assets/images/6033597389461f339542c0be/original.png?16139=
77971" style=3D"width: 40px; height: 40px; display: block !important; overf=
low: hidden !important; outline: none !important; border-width: 0;" width=
=3D"40"></a> <!--LinkedIn--> <a href=3D"https://links.announce.fiverr.com/l=
s/click?upn=3Du001.G8InBdZMyMLFosDO2eMXV62LFMBv0skBaZg4mgswt8FNk-2FgVRuEM6o=
nS4QjMukZr2zNJ7hl-2FkG79AsA94P7AUlFXHohWoKZ0BjA1FavMF-2BSSLfp-2BBilgg3NuagQ=
Ijkn7-2FoBAcyZVQmkQMJKoKujW8A-3D-3DU-Lk_uG012uDKiSxGki9dzRJ3xEOlUwl7FaiWJyJ=
2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHXJUOzPbqrOod=
WRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo7p4X-=
2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP995qG=
j4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82CgHx2O=
62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3wnSs0m=
J2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2BYLPkij6RK4=
UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNkaPvmT=
xLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKEWWHut=
FvCz45X2GMz2BNmPKJCK7zZP-2B5lmu-2FtlLrUMaRc0oYq11j0C-2FcST-2FWeSXFbgSHpd04G=
2dEhTtPW6l6zj7xN87BruQP7eZZsl2he-2FsLXVxVQoBZmeDwaUVbU4wS23wGyac3KyWMba5jlN=
FJjcNk-3D" style=3D"display: inline-block; text-decoration: none !important=
; border-collapse: collapse; mso-line-height-rule: exactly; margin: 0px;"> =
<img alt=3D"LinkedIn" height=3D"40" src=3D"https://appboy-images.com/appboy=
/communication/assets/image_assets/images/6033597726e78f781dfefd41/original=
.png?1613977975" style=3D"width: 40px; height: 40px; display: block !import=
ant; overflow: hidden !important; outline: none !important; border-width: 0=
;" width=3D"40"></a> <!--Instagram--> <a href=3D"https://links.announce.fiv=
err.com/ls/click?upn=3Du001.cVIN5xF103TlrXLUItdQgK94a3FrSetyo1Trw6RZOJTwrFo=
vER-2B9jtaTJz2lWmkPK2KFsF83WtRJ-2F973OiaGdthxuOoucZCvYqb9pPRSqyuZ32-2FPMeH2=
24L3G8uUBkG04MRw_uG012uDKiSxGki9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA-=
2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHXJUOzPbqrOodWRKpLZivKPvBvPr5TrIYtSx=
-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXyt=
5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5nnc=
pVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82CgHx2O62XeyLdblA-2Bi-2FY1UC0L=
1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6IMg=
EbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR6c=
l63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNkaPvmTxLOISXsKRGqznjqdo1dX00p=
I3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKEWWHutFvCz45X2GMz2BNmPKKmYPBj=
gmU0ujskHmCfp6xy4L2lU0DCNex7ERqtlYB-2BErS4MXtR7A3iKYt2dFhzOzoJ2OxEWa8luLVXE=
NdjLRq9TtPjbEc43IgNorreaNSb6ySBU8GphWK-2Fhh7AHgR9kOE-3D" style=3D"display: =
inline-block; text-decoration: none !important; border-collapse: collapse; =
mso-line-height-rule: exactly; margin: 0px;"> <img alt=3D"Instagram" height=
=3D"40" src=3D"https://appboy-images.com/appboy/communication/assets/image_=
assets/images/6033595124413112353135b6/original.png?1613977937" style=3D"wi=
dth: 40px; height: 40px; display: block !important; overflow: hidden !impor=
tant; outline: none !important; border-width: 0;" width=3D"40"></a>
</td>
=09=09</tr>
=09=09<tr>
=09=09=09<td style=3D"color: #C5C6C9; font-size: 12px; line-height: 18px; f=
ont-family: arial,helvetica neue,helvetica,sans-serif; border-collapse: col=
lapse; mso-line-height-rule: exactly;" align=3D"center">
<a href=3D"https://links.announce.fiverr.com/ls/click?upn=3Du001.TWJuC2VN4a=
am7dFLwSK6BJy6VfV63QEkORmMl-2BePSY45U2zWOXwTMiu8r1mVp8qFzQG9_uG012uDKiSxGki=
9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97T=
iByso-2BHXJUOzPbqrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJP=
M4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2=
F2vEQJfGj-2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R=
3Oe91o3xWMRIo82CgHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO=
8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oW=
FsfJAq0D-2BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOT=
XxNJiHmufgpN6aNkaPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7q=
Ckp4NZCpeXGqpJKEWWHutFvCz45X2GMz2BNmPKI8c2j9ODmz-2BOS0HtthpPQrl7s7m3CavRf9N=
gLPuavP6N1XPDKemAcThfriESoWz2UA77ruo7w8O2T5VRrFk3HL-2Fxxz9H8rMuMHWUDO98J52g=
WGucRnKnh7ZnnEg87zBM8-3D" style=3D"color: #126F43; text-decoration: none !i=
mportant; font-weight: bold; border-collapse: collapse; mso-line-height-rul=
e: exactly;">Privacy Policy</a>=C2=A0|=C2=A0<a href=3D"https://links.announ=
ce.fiverr.com/ls/click?upn=3Du001.k8KsZlkjNMfxdkArgyC4jyfHXDLcvfVNVdkPel2UB=
9qcjk8DmEH9Ez58M-2BFPK0mMO1LG_uG012uDKiSxGki9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NL=
JAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHXJUOzPbqrOodWRKpLZivKP=
vBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo7p4X-2FjtH5tJjp=
M7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP995qGj4oNlGV2eS=
xy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82CgHx2O62XeyLdblA=
-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy=
555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2BYLPkij6RK4UPiSO3PKVr=
IW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNkaPvmTxLOISXsKRG=
qznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKEWWHutFvCz45X2GM=
z2BNmPKJGEFuzWMt8s85M7Nl14qyhE8kcz0-2BgxHvZXJVB7RdFld8H5-2Bm4-2B-2FXHdrDZ5v=
kEfxFu7U0JkkfimMziXp73sLtZmrvMq6CGYEydu5YRkFM2JQz3FNdPgOs4tvdXJTkrQWU-3D" s=
tyle=3D"color: #126F43; text-decoration: none !important; font-weight: bold=
; border-collapse: collapse; mso-line-height-rule: exactly;">Support</a>=C2=
=A0|=C2=A0<a href=3D"https://links.announce.fiverr.com/ls/click?upn=3Du001.=
TWJuC2VN4aam7dFLwSK6BNIw0kyKdeNEYMnel2pDQSP6Hsr8gr63UaU-2BTLleXSkRkUhYqs90g=
UXevoR-2BL2UY6evysZQe8UTC-2FtkTdr5Ro8yaDe6-2FUlvv-2FX-2FJ6LrhJJ1vRC7kf522Fk=
As67pj4auEPg-3D-3DCA3l_uG012uDKiSxGki9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM=
9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHXJUOzPbqrOodWRKpLZivKPvBvPr5T=
rIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj=
5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP995qGj4oNlGV2eSxy5Gf5Q=
Nw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82CgHx2O62XeyLdblA-2Bi-2F=
Y1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy555OLjz=
af6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2BYLPkij6RK4UPiSO3PKVrIW6-2Fl=
RznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNkaPvmTxLOISXsKRGqznjqdo=
1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKEWWHutFvCz45X2GMz2BNmPK=
IXjB7o851HlE-2BgLwSAkGze998WAkawYUD6VWl8Fc9Z-2FyiaufhSshd8q5jOvKd8tTWGm9rDe=
n814wTOA72tfeNWPwxGP4zOj2UWrnP1fXkM80RlVTIBeUFnC4cbkR8IpsE-3D" style=3D"col=
or: #126F43; text-decoration: none !important; font-weight: bold; border-co=
llapse: collapse; mso-line-height-rule: exactly;">Invite Friends</a>=C2=A0|=
=C2=A0<a href=3D"https://links.announce.fiverr.com/ls/click?upn=3Du001.TWJu=
C2VN4aam7dFLwSK6BCZti4ea-2BGWJPk4H6Qlhxj7tayXONrbLQ6XymHCnzv-2BOGH4lP-2FASg=
jPkxRopwCUqYH13iKAMa4pzshcjYSakX0Mrv4YjHIGG9vISuKgfMXMzCEf6_uG012uDKiSxGki9=
dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97Ti=
Byso-2BHXJUOzPbqrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM=
4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F=
2vEQJfGj-2F0rgP995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3=
Oe91o3xWMRIo82CgHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8=
NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWF=
sfJAq0D-2BYLPkij6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTX=
xNJiHmufgpN6aNkaPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qC=
kp4NZCpeXGqpJKEWWHutFvCz45X2GMz2BNmPKKZvGH0tJqkR0t3Awh8klcJEL9pKRvwYq9l2rT4=
arqUEwv5BmtKyrOdGqp-2F98A22Emb3sBEgzeUYBTiP5SPGin5jCflH1oFNN3Naj0zEhuxZkqK6=
0qD3Nz2L1Cbfj1ybkI-3D" style=3D"color: #126F43; text-decoration: none !impo=
rtant; font-weight: bold; border-collapse: collapse; mso-line-height-rule: =
exactly;">Get Inspired</a><br>
=09=09=09<br>
=09=09=09<span style=3D"color: #7A7D85; border-collapse: collapse; mso-line=
-height-rule: exactly;">This email was sent to you by Fiverr International =
Ltd.<br>
=09=09=09You are receiving this email because you signed up for  Fiverr.=C2=
=A0 <br>
=09=09=09If you wish to unsubscribe from all future emails, please click <a=
 href=3D"https://links.announce.fiverr.com/ls/click?upn=3Du001.TWJuC2VN4aam=
7dFLwSK6BHN4kGLQi8HVS5ggjnuAiHdDw7pbntTL3sYzQE08CA8m0VYM55NDluP-2BApkIk5hnd=
VteWCLpTv1hw9WFEZDOcJJOaV2oOS6H9WUOWFOCEUKi-2F5n1iQIH6oON07W7vrTZN37VfXQ0Rv=
FIMSEpUcu6HkMCPchWOkQGXj5NPkgqbemL4N5BUGxfmDXhv2n7GNRVjvKNn-2BgnHxesb-2FoTT=
2QhJdYXMromP5h7fVm15FhuyAQoX3a0XkDdSRzMNJeZZGrlv5fxyvZM7d9F9mfyDEAzQtTtZbSe=
MWCnU1sL0wlsN6AzlgoCa9Yt2E7L0fmW3ZuAH10-2Bns-2B6-2BFPJdBQwwJwbPZU1hRZ-2Furo=
8HZkyV06Fd3ovXPgpkdc-2Bs5eRKET9aqeGSLbRfdolAJb-2B5E7914-2B4fML4kXY4RA5q3LJw=
TgOx4-2Bv4YLdCeD8wapI7R8Vp102CeSNEhM6kLlOHq9ai5CMe9noP6iv1POaPt2OUZL2E2S3bp=
RFgPXaqKysXwfR6h7cUm-2FhQNnvJ9mnG-2BC7-2FHKI26uX1jfiKYlsughIAsD0UT9aCWr6ntU=
s5YMoaGMF9CYpP3v3giaHC-2FLqozlLBlLqU0Ik1h13m5DcKdn0MkUPfiaQOtjT2JRmXXDmwq7D=
eoKAkqZwoVUWPMx-2FHtSztvODbBeHproB-2BaimvCzsv9qWSQwA39V2Fp-2F5EjycZFkiPwyMf=
0Ep5WdLQyx5jhff-2FV91zW4I-3DWfll_uG012uDKiSxGki9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q=
5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHXJUOzPbqrOodWRKpLZi=
vKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo7p4X-2FjtH5t=
JjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP995qGj4oNlGV=
2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82CgHx2O62XeyLd=
blA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3wnSs0mJ2LpXtB=
YRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2BYLPkij6RK4UPiSO3P=
KVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNkaPvmTxLOISXs=
KRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKEWWHutFvCz45X=
2GMz2BNmPKLFry4Pr6CCQIaA-2BDJDbKj2GijZh0JBiFIg3MajwUX-2BlO0g-2B5pMnb-2Bj-2F=
VVY-2F9AbyVNdmE7nQo2YQIk9tZGyOShV10esvvIAjWJ9hzFd2TvIOFZsFoZEWmu-2FRKwK7Rb4=
JBk-3D" style=3D"color: #126F43; text-decoration: none !important; border-c=
ollapse: collapse; mso-line-height-rule: exactly;">here</a>.<br>
=09=09=09<br>
=09=09=09Fiverr International Ltd. | 26 Mercer St. | New York, NY 10013, US=
A</span>
</td>
=09=09</tr>
=09=09<tr>
=09=09=09<td align=3D"center" class=3D"center" style=3D"border-collapse: co=
llapse; mso-line-height-rule: exactly; padding: 20px 10px;">
<!--Apple Store--><a href=3D"https://links.announce.fiverr.com/ls/click?upn=
=3Du001.TWJuC2VN4aam7dFLwSK6BGFnA51R0-2FgHS7HTpvECFellnzC7yvXcyJWVHLFwwWV0-=
2FNxowR0FdqJ7b4gTfd9FcIxm9CQYuhYrFwuovjQ42JVpTHD93vWh4HN7GWA5MknrXifFkCRUJO=
DFOXhGC5yn6w-3D-3D8KHG_uG012uDKiSxGki9dzRJ3xEOlUwl7FaiWJyJ2zv3y4q5NLJAPq0wM=
9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHXJUOzPbqrOodWRKpLZivKPvBvPr5T=
rIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10Vj0dJNo7p4X-2FjtH5tJjpM7FnFbj=
5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-2F0rgP995qGj4oNlGV2eSxy5Gf5Q=
Nw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRIo82CgHx2O62XeyLdblA-2Bi-2F=
Y1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy6kcQ3wnSs0mJ2LpXtBYRy555OLjz=
af6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2BYLPkij6RK4UPiSO3PKVrIW6-2Fl=
RznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufgpN6aNkaPvmTxLOISXsKRGqznjqdo=
1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeXGqpJKEWWHutFvCz45X2GMz2BNmPK=
KIQzv3gy44k5tlm-2BADNd6Lp42Ifw4wWtforuqagjRXp9TWdZCqJqxbpW73HD4qInVc64rgJle=
cQQUyYefGPJRTit11t1WMWc9Vz6osEUkSD79zdw2Pus-2FM1dKmKX6X9j0-3D" style=3D"dis=
play: inline-block; width: 120px; height: 36px; text-decoration: none !impo=
rtant; border-collapse: collapse; mso-line-height-rule: exactly; margin: 4p=
x;"><img alt=3D"Apple Store" height=3D"36" src=3D"https://appboy-images.com=
/appboy/communication/assets/image_assets/images/60335ea2798dc82632426968/o=
riginal.png?1613979298" width=3D"120" style=3D"display: block !important; o=
verflow: hidden !important; outline: none !important; border-width: 0;"></a=
> <!--Google Store--> <a href=3D"https://links.announce.fiverr.com/ls/click=
?upn=3Du001.TWJuC2VN4aam7dFLwSK6BIQOUy-2FOVR6aWqdX89KJtdL-2Fz9kRKDoZMQXGd4D=
PGYggSW0Ny-2FYkteywyg5DmVodXlY4yhH0LYbBws-2BcKhp0it1JWEHz3tfPDAui0GyQ6YIsL2=
3MAMWIK7j2vRqGDPROK26JbjiW1WRtaNSL2FvzB4E-3DJWRN_uG012uDKiSxGki9dzRJ3xEOlUw=
l7FaiWJyJ2zv3y4q5NLJAPq0wM9VKGA-2BCIoFMsD3DMvvhC8Twns44GGxSS97TiByso-2BHXJU=
OzPbqrOodWRKpLZivKPvBvPr5TrIYtSx-2FhqcL9b-2BV0SKSSZnf9e67eZJqJPM4EcITF10Vj0=
dJNo7p4X-2FjtH5tJjpM7FnFbj5vxXyt5YaaG3vmRozMJszPU-2Fb-2BiDchl-2F2vEQJfGj-2F=
0rgP995qGj4oNlGV2eSxy5Gf5QNw5nncpVxwNFftpgG4XlTjkKBAYB7C3k5jK1R3Oe91o3xWMRI=
o82CgHx2O62XeyLdblA-2Bi-2FY1UC0L1qAEKhKWwdF-2BQ0emktiO91HrffGMO8NRLnMskJy6k=
cQ3wnSs0mJ2LpXtBYRy555OLjzaf6IMgEbXJEpXcQ6wbiTschoJ-2BVLsca64oWFsfJAq0D-2BY=
LPkij6RK4UPiSO3PKVrIW6-2FlRznR6cl63oKcIzMfsTvlfiWVVUW2hKHk2pNOTXxNJiHmufgpN=
6aNkaPvmTxLOISXsKRGqznjqdo1dX00pI3kXtExdQIHnB-2BuS9m8-2BqJKuv7qCkp4NZCpeXGq=
pJKEWWHutFvCz45X2GMz2BNmPKJ7AD15qN86Jo-2BxqJ4jz-2BzHfFx8sVvdeLiOHQ2GEwNH5o9=
2khmHeDYWtFNr-2BDdKV0JA6AtkDyUTLVBOrImJhlAKqT-2FEYhjzUudgBfmkEY3kOfgpAkhU8C=
sYmvzrw30Onug-3D" style=3D"display: inline-block; width: 120px; height: 36p=
x; text-decoration: none !important; border-collapse: collapse; mso-line-he=
ight-rule: exactly; margin: 4px;"> <img alt=3D"Google Store" height=3D"36" =
src=3D"https://appboy-images.com/appboy/communication/assets/image_assets/i=
mages/60335eaf83566879cab564c3/original.png?1613979311" width=3D"120" style=
=3D"display: block !important; overflow: hidden !important; outline: none !=
important; border-width: 0;"></a>
</td>
=09=09</tr>
=09</tbody>
</table>
<br>
<br>
<br>


<div id=3D"_eoa_div" style=3D"display: none; background-image: url('https:/=
/VpBM5I1Och.eoapxl.com/VpBM5I1Och/8178e41e-b7e5-4d07-9d0b-3329ffe8a78b/P');=
"></div>
<img alt=3D"" border=3D"0" height=3D"1" id=3D"_eoa_img" src=3D"https://VpBM=
5I1Och.eoapxl.com/VpBM5I1Och/8178e41e-b7e5-4d07-9d0b-3329ffe8a78b" style=3D=
"height: 1px !important; width: 1px !important; display: block !important; =
overflow: hidden !important; outline: none !important; margin: 0; padding: =
0; border-width: 0;" title=3D"" width=3D"1">
                       </td>
                      </tr>
                      <tr>
                       <td height=3D"20" style=3D"line-height: 1px; font-si=
ze: 1px; border-collapse: collapse; mso-line-height-rule: exactly;">&nbsp;<=
/td>
                      </tr>
                     </table>
                    </td>
                    <td width=3D"30" class=3D"em_hide" style=3D"border-coll=
apse: collapse; mso-line-height-rule: exactly;">&nbsp;</td>
                   </tr>
                  </table>
                 </td>
                </tr>
               </table>
              </td>
             </tr>
            </table>
           </td>
          </tr>
         </table>
<div style=3D"display: none; white-space: nowrap; color: #ffffff; backgroun=
d-color: #ffffff; font: 20px courier;">- - - - - - - - - - - - - - - - - - =
- - - - -</div>
</body>

          </html>

--4b2c80fd3166b840258a19e843407a41ea5b0d7a481a9af82bcc95473c61--`;
