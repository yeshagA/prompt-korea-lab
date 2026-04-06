import Layout from "@/components/Layout";

const PrivacyPage = () => (
  <Layout>
    <section className="section-padding korean-bg">
      <div className="container-main max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground">개인정보 처리방침</h1>
        <p className="mt-2 text-sm text-muted-foreground">최종 업데이트: 2026년 4월</p>

        <div className="mt-8 space-y-8">
          {[
            {
              title: "1. 수집하는 개인정보",
              content: "저희는 회원가입 시 이메일 주소, 이름, 사용자 유형을 수집합니다. 학습 진행 상황 및 인증서 발급 정보도 저장됩니다.",
            },
            {
              title: "2. 개인정보 이용 목적",
              content: "수집된 개인정보는 서비스 제공, 학습 진행 추적, 인증서 발급 및 검증, 사용자 경험 개선을 위해 사용됩니다.",
            },
            {
              title: "3. 개인정보 보관 기간",
              content: "회원 탈퇴 시까지 개인정보를 보관합니다. 탈퇴 후에는 즉시 파기하며, 법령에 따라 보관이 필요한 경우 해당 기간 동안 보관합니다.",
            },
            {
              title: "4. 개인정보 제3자 제공",
              content: "저희는 사용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 법령에 의한 요청이 있는 경우는 예외입니다.",
            },
            {
              title: "5. 사용자의 권리",
              content: "사용자는 언제든지 자신의 개인정보를 조회, 수정, 삭제할 수 있습니다. 관련 문의는 support@beeintel.ai로 연락해주세요.",
            },
            {
              title: "6. 문의처",
              content: "개인정보 처리방침에 관한 문의사항은 support@beeintel.ai로 연락해주세요. Bee Intelligence Global, 76 Gyeonginnam-gil, Incheon, Korea",
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

export default PrivacyPage;