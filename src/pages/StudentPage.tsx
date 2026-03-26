import Layout from "@/components/Layout";

const StudentPage = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-main">
        <h1 className="text-3xl font-bold text-foreground">학생 학습 경로</h1>
        <p className="mt-3 text-muted-foreground">
          과제, 발표, 학습 정리, 시험 대비를 위한 AI 활용 학습 경로입니다.
        </p>
      </div>
    </section>
  </Layout>
);

export default StudentPage;