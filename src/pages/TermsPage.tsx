import Layout from "@/components/Layout";

const TermsPage = () => (
  <Layout>
    <section className="section-padding korean-bg">
      <div className="container-main max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground">이용약관</h1>
        <p className="mt-2 text-sm text-muted-foreground">최종 업데이트: 2026년 4월</p>

        <div className="mt-8 space-y-8">
          {[
            {
              title: "1. 서비스 이용 동의",
              content: "Learn Prompting Korea를 이용함으로써 본 이용약관에 동의하는 것으로 간주됩니다. 약관에 동의하지 않으실 경우 서비스 이용을 중단해 주세요.",
            },
            {
              title: "2. 서비스 내용",
              content: "저희는 AI 프롬프팅 학습 콘텐츠, 실습 환경, 인증서 발급 서비스를 제공합니다. 서비스 내용은 예고 없이 변경될 수 있습니다.",
            },
            {
              title: "3. 계정 및 보안",
              content: "사용자는 자신의 계정 정보를 안전하게 관리할 책임이 있습니다. 계정 도용이 의심되는 경우 즉시 저희에게 알려주세요.",
            },
            {
              title: "4. 금지 행위",
              content: "서비스를 이용하여 타인에게 피해를 주는 행위, 저작권을 침해하는 행위, 시스템을 해킹하거나 악성 코드를 배포하는 행위는 엄격히 금지됩니다.",
            },
            {
              title: "5. 인증서 정책",
              content: "인증서는 정해진 학습 과정을 성실히 이수한 경우에만 발급됩니다. 부정한 방법으로 취득한 인증서는 취소될 수 있습니다.",
            },
            {
              title: "6. 책임 제한",
              content: "저희는 서비스 이용 중 발생하는 손해에 대해 법령이 허용하는 범위 내에서 책임을 제한합니다. 서비스는 현재 상태 그대로 제공됩니다.",
            },
            {
              title: "7. 약관 변경",
              content: "이용약관은 필요에 따라 변경될 수 있습니다. 변경 시 서비스 내 공지를 통해 안내드립니다.",
            },
            {
              title: "8. 문의처",
              content: "이용약관에 관한 문의사항은 support@beeintel.ai로 연락해주세요.",
            },
          ].map((section) => (
            <div key={section.title} className="bg-card rounded-xl border p-6">
              <h2 className="text-base font-bold text-foreground mb-3">{section.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default TermsPage;