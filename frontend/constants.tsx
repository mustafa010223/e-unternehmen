import React from 'react';
import { SlideData, SlideLayout } from './types';
import {
  FaUnlink, FaBrain, FaCogs, FaRoad, FaUsers,
  FaProjectDiagram, FaCode, FaBoxOpen, FaVial, FaPaperPlane, FaCloudUploadAlt, FaServer, FaChartLine,
  FaGitAlt, FaGithub, FaGitlab, FaBitbucket, FaJira, FaTrello, FaJenkins, FaDocker, FaAws, FaEtsy, FaFilm,
  FaHandPaper, FaRobot, FaCalendarAlt, FaStopwatch, FaUndo,
  FaLink, FaBook, FaCubes
} from 'react-icons/fa';
import { SiAnsible, SiTerraform, SiKubernetes, SiPrometheus, SiGrafana, SiDatadog, SiElasticstack, SiSonarqube, SiJunit5, SiSelenium, SiApachemaven, SiGradle } from 'react-icons/si';


export const COLORS = {
  background: '#FCFCFC',
  primary: '#277884', // Koyu Camgöbeği
  secondary: '#3A342F', // Kömür Grisi
  accent: '#F57325', // Enerjik Turuncu
};

const iconProps = { className: "inline-block mr-4 text-2xl", style: { color: COLORS.secondary } };
const toolIconProps = { className: "inline-block mx-auto text-4xl", style: { color: COLORS.secondary } };

export const SLIDE_DATA: SlideData[] = [
  // Bölüm 1
  {
    id: 1,
    layout: SlideLayout.Title,
    title: 'CI/CD Motoru: sunum esnasinda ci-cd sürecini göstermek icin degistirildi',
    subtitle: 'Modern Yazılım Geliştirmenin Kalbindeki Otomasyon ve Kültür',
  },
  {
    id: 2,
    layout: SlideLayout.Agenda,
    title: 'Yol Haritamız',
    listItems: [
      { text: 'Problem: "Karışıklık Duvarı" ve Yavaş Süreçler', icon: <FaUnlink {...iconProps} /> },
      { text: 'Felsefe: DevOps Kültürü ve İlkeleri', icon: <FaBrain {...iconProps} /> },
      { text: 'Mekanizma: Hareket Halindeki CI/CD İş Akışı', icon: <FaCogs {...iconProps} /> },
      { text: 'Kanıt: DORA Metrikleri ile Değeri Ölçmek', icon: <FaChartLine {...iconProps} /> },
      { text: 'Gelecek: CI/CD\'nin Evrimi ve Yeni Ufuklar', icon: <FaRoad {...iconProps} /> },
    ],
  },
  {
    id: 3,
    layout: SlideLayout.CenteredGraphic,
    title: 'Neden Değişime İhtiyaç Duyduk?',
    graphic: { type: 'cartoon', data: { title: "Entegrasyon Cehennemi", text: "Ayrı çalışan ekipler, geliştirme sürecinin sonunda kodlarını birleştirmeye çalıştığında, çözülmesi günler süren karmaşık hatalarla karşılaşır." } }
  },
  {
    id: 4,
    layout: SlideLayout.Waterfall,
    title: 'Waterfall (Şelale) Modeli: Geri Dönüşü Olmayan Yol',
    text: "Her aşama bir sonrakine geçmeden tamamen biter. Süreçte bir değişiklik gerektiğinde, başa dönmek neredeyse imkansızdır ve maliyetlidir."
  },
  {
    id: 5,
    layout: SlideLayout.WallOfConfusion,
    title: 'Geliştirme ve Operasyon Arasındaki Duvar',
    shouldAnimateWall: 'build',
  },
  // Bölüm 2
  {
    id: 6,
    layout: SlideLayout.WallOfConfusion,
    title: 'Duvarları Yıkmak: DevOps Felsefesi',
    shouldAnimateWall: 'destroy',
  },
  {
    id: 7,
    layout: SlideLayout.DevOpsWhatIs,
    title: "DevOps'u Doğru Anlamak"
  },
  {
    id: 8,
    layout: SlideLayout.DevOpsCycle,
    title: 'Sürekli Değer Akışı',
    text: 'DevOps, yazılım yaşam döngüsünü kısaltmayı ve yüksek kaliteyle sürekli teslimat sağlamayı amaçlayan bir yaklaşımdır.',
    animatedCycle: { stage: null, description: '' }
  },
  // Bölüm 3
  {
    id: 9,
    layout: SlideLayout.CIvsCD,
    title: 'CI/CD: Felsefeden Eyleme',
    text: 'Sürekli Entegrasyon (CI) ve Sürekli Teslimat/Dağıtım (CD), DevOps felsefesini hayata geçiren otomatikleştirilmiş süreçler bütünüdür. Geliştiricilerin çalışmalarını sık sık entegre etmelerini ve her değişikliğin güvenilir bir şekilde üretime taşınmasını sağlar.',
  },
  {
    id: 10,
    layout: SlideLayout.DevOpsCycle,
    title: '',
    animatedCycle: { stage: 'Code', description: 'Geliştirici, kodu yazar ve sürüm kontrol sistemine (örn. Git) gönderir.' }
  },
  {
    id: 11,
    layout: SlideLayout.DevOpsCycle,
    title: '',
    animatedCycle: { stage: 'Build', description: 'Kod, derlenir ve çalıştırılabilir bir pakete dönüştürülür.' }
  },
  {
    id: 12,
    layout: SlideLayout.DevOpsCycle,
    title: '',
    animatedCycle: { stage: 'Test', description: 'Otomatik testler (birim, entegrasyon) çalıştırılarak hatalar erken aşamada tespit edilir.' }
  },
  {
    id: 13,
    layout: SlideLayout.DevOpsCycle,
    title: '',
    animatedCycle: { stage: 'Release', description: 'Testleri geçen yapı, dağıtıma hazır bir sürüm olarak paketlenir.' }
  },
  {
    id: 14,
    layout: SlideLayout.DevOpsCycle,
    title: '',
    animatedCycle: { stage: 'Deploy', description: 'Paket, test veya üretim ortamlarına otomatik olarak dağıtılır.' }
  },
  {
    id: 15,
    layout: SlideLayout.DevOpsCycle,
    title: '',
    animatedCycle: { stage: 'Operate', description: 'Uygulama canlı ortamda çalışır ve performansı sürekli izlenir. Geri bildirimler, yeni bir döngüyü başlatır.' }
  },
  {
    id: 16,
    layout: SlideLayout.DevOpsCycle,
    title: '',
    animatedCycle: { stage: 'End', description: '' }
  },
  {
    id: 17,
    layout: SlideLayout.DeploymentStrategy,
    title: 'Önemli Bir Ayrım: Teslimat ve Dağıtım',
    text: 'Temel fark, üretime dağıtımın manuel bir onay adımı gerektirip gerektirmediğidir.',
    twoColumn: {
      left: { title: 'Sürekli Teslimat (Continuous Delivery)', content: 'Build (auto) → Test (auto) → Deploy to Stage (auto) → Deploy to Production (MANUAL)', icon: <FaHandPaper className="text-5xl text-accent" /> },
      right: { title: 'Sürekli Dağıtım (Continuous Deployment)', content: 'Build (auto) → Test (auto) → Deploy to Stage (auto) → Deploy to Production (AUTO)', icon: <FaRobot className="text-5xl" style={{ color: COLORS.primary }} /> },
    },
  },
  {
    id: 18,
    layout: SlideLayout.ToolsTable,
    title: 'Her Aşama İçin Doğru Araçlar',
    tableData: {
      headers: ['Aşama', 'Anahtar Aktiviteler', 'Temsili Araçlar (Logolar)'],
      rows: [
        [{ text: 'Plan', icon: <FaProjectDiagram {...toolIconProps} /> }, 'Proje yönetimi, görev takibi', { text: '', icon: <><FaJira {...toolIconProps} /> <FaTrello {...toolIconProps} /></> }],
        [{ text: 'Code', icon: <FaCode {...toolIconProps} /> }, 'Kod yazma, sürüm kontrolü', { text: '', icon: <><FaGitAlt {...toolIconProps} /> <FaGithub {...toolIconProps} /> <FaGitlab {...toolIconProps} /> <FaBitbucket {...toolIconProps} /></> }],
        [{ text: 'Build', icon: <FaBoxOpen {...toolIconProps} /> }, 'Derleme, paketleme', { text: '', icon: <><FaJenkins {...toolIconProps} /> <SiApachemaven {...toolIconProps} /> <SiGradle {...toolIconProps} /> <FaDocker {...toolIconProps} /></> }],
        [{ text: 'Test', icon: <FaVial {...toolIconProps} /> }, 'Otomatik testler, kod kalitesi', { text: '', icon: <><SiSelenium {...toolIconProps} /> <SiJunit5 {...toolIconProps} /> <SiSonarqube {...toolIconProps} /></> }],
        [{ text: 'Release', icon: <FaPaperPlane {...toolIconProps} /> }, 'Sürüm yönetimi, artifact depolama', { text: '', icon: <><FaDocker {...toolIconProps} /> <span>Nexus, Artifactory</span></> }],
        [{ text: 'Deploy', icon: <FaCloudUploadAlt {...toolIconProps} /> }, 'Dağıtım, yapılandırma yönetimi', { text: '', icon: <><SiKubernetes {...toolIconProps} /> <SiAnsible {...toolIconProps} /> <SiTerraform {...toolIconProps} /> <FaAws {...toolIconProps} /></> }],
        [{ text: 'Operate', icon: <FaServer {...toolIconProps} /> }, 'Altyapı yönetimi, orkestrasyon', { text: '', icon: <><FaDocker {...toolIconProps} /> <SiKubernetes {...toolIconProps} /> <FaAws {...toolIconProps} /></> }],
        [{ text: 'Monitor', icon: <FaChartLine {...toolIconProps} /> }, 'İzleme, loglama, uyarı', { text: '', icon: <><SiPrometheus {...toolIconProps} /> <SiGrafana {...toolIconProps} /> <SiDatadog {...toolIconProps} /> <SiElasticstack {...toolIconProps} /></> }],
      ]
    }
  },
  // Bölüm 4
  {
    id: 19,
    layout: SlideLayout.DoraMetrics,
    title: 'Sadece Daha Hızlı Değil, Daha İyi: DORA Metrikleri',
    text: 'DevOps Araştırma ve Değerlendirme (DORA) ekibi tarafından geliştirilen dört temel metrik, yazılım teslimat performansını hem hız hem de istikrar açısından ölçmek için endüstri standardı haline gelmiştir. Bu metrikler, teknik uygulamaların iş üzerindeki etkisini doğrudan gösterir.'
  },
  {
    id: 20,
    layout: SlideLayout.DoraTable,
    title: 'Performansı Anlamak: Hız ve İstikrar Dengesi',
    tableData: {
      headers: ['Kategori', 'Metrik', 'Ne Ölçer?', 'İş İçin Neden Önemli?'],
      rows: [
        ['Hız (Velocity)', 'Dağıtım Sıklığı (Deployment Frequency)', 'Kodun ne sıklıkla başarılı bir şekilde üretime dağıtıldığı.', 'Pazar taleplerine ve müşteri ihtiyaçlarına ne kadar hızlı yanıt verildiğini gösterir.'],
        ['Hız (Velocity)', 'Değişiklikler İçin Teslim Süresi (Lead Time for Changes)', 'Bir kod değişikliğinin (commit) üretime ulaşmasının ne kadar sürdüğü.', 'Tüm geliştirme ve teslimat sürecinin verimliliğini ölçer.'],
        ['İstikrar (Stability)', 'Değişiklik Hata Oranı (Change Failure Rate)', 'Üretime yapılan dağıtımların yüzde kaçının bir hataya neden olduğu.', 'Ürün kalitesini ve güvenilirliğini, hız için kaliteden ödün verilip verilmediğini gösterir.'],
        ['İstikrar (Stability)', 'Hizmeti Geri Yükleme Süresi (Time to Restore Service)', 'Bir hata veya kesinti sonrası hizmetin ne kadar sürede kurtarıldığı.', 'Sistemin dayanıklılığını ve bir sorun anında iş üzerindeki olumsuz etki süresini ölçer.'],
      ],
      categoryHighlight: { columnIndex: 0, value: 'Hız (Velocity)', color: 'bg-blue-100' }
    }
  },
  {
    id: 21,
    layout: SlideLayout.SuccessStories,
    title: 'Devlerin İzinde: DevOps Başarı Hikayeleri',
    threeColumn: {
      items: [
        { logo: <FaAws className="text-5xl text-gray-700" />, title: 'Amazon', text: "Tam otomatik dağıtım modeliyle yeni özellikleri günler yerine dakikalar içinde canlıya alarak pazara sürüm süresini dramatik şekilde kısalttı." },
        { logo: <FaFilm className="text-5xl text-red-600" />, title: 'Netflix', text: "Mikroservisler ve tam otomasyon sayesinde günde yüzlerce dağıtım yaparak yenilik hızını ve hizmet kararlılığını artırdı." },
        { logo: <FaEtsy className="text-5xl text-orange-500" />, title: 'Etsy', text: "Sağlam bir CI/CD boru hattı ile günde onlarca dağıtım yaparak pazar ve kullanıcı geri bildirimlerine anında yanıt verme çevikliği kazandı." }
      ]
    }
  },
  // Bölüm 5
  {
    id: 22,
    layout: SlideLayout.Future,
    title: 'Sırada Ne Var?',
    text: 'CI/CD statik bir kavram değildir. Sürekli olarak daha güvenli, daha akıllı ve daha verimli hale gelmek için evrimleşmektedir.',
  },
  {
    id: 23,
    layout: SlideLayout.DevSecOps,
    title: 'DevSecOps: Güvenliği Sola Kaydırmak (Shift Left)',
    text: 'DevSecOps, güvenliği geliştirme yaşam döngüsünün sonuna bırakmak yerine, her aşamasına entegre eden bir yaklaşımdır. Amaç, \'herkesin güvenlikten sorumlu olduğu\' bir kültür yaratmaktır.',
  },
  {
    id: 24,
    layout: SlideLayout.GitOps,
    title: 'GitOps: Altyapı İçin Tek Doğruluk Kaynağı',
    text: "GitOps, altyapı ve uygulama yapılandırmalarını yönetmek için Git'i merkezi ve tek doğruluk kaynağı olarak kullanan bir operasyonel çerçevedir. Her şey kod olarak tanımlanır, versiyonlanır ve otomatik olarak senkronize edilir.",
  },
  {
    id: 25,
    layout: SlideLayout.ComparisonTable,
    title: 'Riskleri Azaltmak: Aşamalı Teslimat Stratejileri',
    tableData: {
      headers: ['Özellik', 'Blue-Green Deployment', 'Canary Deployment'],
      rows: [
        ['Yaklaşım', 'Trafik, iki özdeş ortam (Mavi ve Yeşil) arasında anında değiştirilir.', 'Yeni sürüm, kullanıcıların küçük bir yüzdesine kademeli olarak sunulur.'],
        ['Kaynak Maliyeti', 'Yüksek. Tam bir üretim ortamının kopyasını gerektirir.', 'Düşük. Sadece küçük bir ek kapasiteye ihtiyaç duyar.'],
        ['Risk Yönetimi', 'Hızlı geri dönüş imkanı sunar, ancak bir sorun olursa tüm trafik etkilenir.', 'Etki alanını (blast radius) en aza indirir; sorunlar yalnızca küçük bir grubu etkiler.'],
        ['Geri Dönüş', 'Anında. Trafik tekrar eski ortama yönlendirilir.', 'Hızlı. Yeni sürüm geri çekilir veya trafik tamamen eski sürüme yönlendirilir.'],
      ]
    }
  },
  {
    id: 26,
    layout: SlideLayout.AIOps,
    title: 'Gelecek Burada: AIOps ile Akıllı Operasyonlar',
    text: "AIOps (Yapay Zeka Destekli BT Operasyonları), CI/CD boru hatlarını optimize etmek için makine öğrenimini kullanır. Anormallikleri tahmin eder, sorunları proaktif olarak çözer ve kaynak kullanımını akıllıca yöneterek daha dayanıklı ve verimli sistemler oluşturur.",
  },
  // Bölüm 6
  {
    id: 27,
    layout: SlideLayout.Summary,
    title: 'Eve Götürülecek Mesajlar',
    listItems: [
      { text: 'DevOps, araçlardan önce bir kültür ve felsefedir: İletişim ve işbirliği esastır.', icon: <FaBrain {...iconProps} /> },
      { text: 'CI/CD, bu felsefeyi hayata geçiren otomasyon motorudur; hız ve kaliteyi bir araya getirir.', icon: <FaCogs {...iconProps} /> },
      { text: 'DORA metrikleri ile başarınızı ölçün ve iş değerini kanıtlayın.', icon: <FaChartLine {...iconProps} /> },
      { text: 'DevSecOps, GitOps ve AIOps gibi yeniliklerle sürekli olarak gelişmeye ve öğrenmeye devam edin.', icon: <FaBook {...iconProps} /> },
    ]
  },
  {
    id: 28,
    layout: SlideLayout.End,
    title: 'Teşekkürler!',
    subtitle: 'Sorularınız?',
  }
];