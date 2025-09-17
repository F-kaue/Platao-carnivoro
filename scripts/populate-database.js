import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://ylkitmkjcmvtkgzxapcs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsa2l0bWtqY212dGtnenhhcGNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNDg1MjYsImV4cCI6MjA3MjkyNDUyNn0.ofHoaODiDXVli1tf7UvIM_GmdfJ1vY6XNyt_uHlAie4"
);

// Dados iniciais para site_settings
const siteSettings = [
  {
    key: 'site_title',
    value: 'Platão Carnívoro',
    description: 'Título principal do site',
    category: 'general'
  },
  {
    key: 'site_description',
    value: 'Filosofia, Carnivorismo e Desenvolvimento Pessoal',
    description: 'Descrição do site',
    category: 'general'
  },
  {
    key: 'contact_email',
    value: 'plataocarnivoro@gmail.com',
    description: 'Email de contato',
    category: 'contact'
  },
  {
    key: 'hero_title',
    value: 'Mantenha suas Raízes',
    description: 'Título da seção hero',
    category: 'content'
  },
  {
    key: 'hero_subtitle',
    value: 'Conecte-se com a sabedoria ancestral através da filosofia e do carnívorismo',
    description: 'Subtítulo da seção hero',
    category: 'content'
  }
];

// Dados iniciais para navigation_links
const navigationLinks = [
  {
    title: 'Início',
    url: '/',
    icon: 'Home',
    position: 'header',
    order: 1,
    is_active: true
  },
  {
    title: 'Testo1k',
    url: '/testo1k',
    icon: 'Book',
    position: 'header',
    order: 2,
    is_active: true
  },
  {
    title: 'Admin',
    url: '/admin',
    icon: 'Settings',
    position: 'header',
    order: 3,
    is_active: true
  },
  {
    title: 'Instagram',
    url: 'https://instagram.com/plataocarnivoro',
    icon: 'Instagram',
    position: 'social',
    order: 1,
    is_active: true
  },
  {
    title: 'YouTube',
    url: 'https://youtube.com/@plataocarnivoro',
    icon: 'Youtube',
    position: 'social',
    order: 2,
    is_active: true
  }
];

// Dados iniciais para content_blocks
const contentBlocks = [
  {
    key: 'testo1k_title',
    title: 'Título Testo1k',
    content: 'Testo1k - O Guia Completo',
    type: 'title',
    page: 'testo1k',
    order: 1,
    is_active: true
  },
  {
    key: 'testo1k_subtitle',
    title: 'Subtítulo Testo1k',
    content: 'Descubra os segredos do carnívorismo e transforme sua vida',
    type: 'subtitle',
    page: 'testo1k',
    order: 2,
    is_active: true
  },
  {
    key: 'testo1k_price',
    title: 'Preço Testo1k',
    content: 'R$ 97,00',
    type: 'price',
    page: 'testo1k',
    order: 3,
    is_active: true
  },
  {
    key: 'landing_title',
    title: 'Título Landing',
    content: 'Transforme sua vida com o Testo1k',
    type: 'title',
    page: 'testo1k/landing',
    order: 1,
    is_active: true
  },
  {
    key: 'landing_description',
    title: 'Descrição Landing',
    content: 'Descubra como o carnívorismo pode revolucionar sua saúde e bem-estar',
    type: 'description',
    page: 'testo1k/landing',
    order: 2,
    is_active: true
  }
];

// Dados iniciais para newsletter_benefits
const newsletterBenefits = [
  {
    title: 'Conteúdo Exclusivo',
    description: 'Receba artigos e insights exclusivos sobre carnívorismo e filosofia',
    icon: 'BookOpen',
    order: 1,
    is_active: true
  },
  {
    title: 'Dicas Práticas',
    description: 'Dicas práticas para implementar o estilo de vida carnívoro',
    icon: 'Lightbulb',
    order: 2,
    is_active: true
  },
  {
    title: 'Comunidade',
    description: 'Faça parte de uma comunidade de pessoas com ideais similares',
    icon: 'Users',
    order: 3,
    is_active: true
  },
  {
    title: 'Suporte',
    description: 'Suporte direto para suas dúvidas sobre carnívorismo',
    icon: 'MessageCircle',
    order: 4,
    is_active: true
  }
];

async function populateDatabase() {
  console.log('🚀 Iniciando população do banco de dados...');

  try {
    // Inserir site_settings
    console.log('📝 Inserindo configurações do site...');
    const { error: settingsError } = await supabase
      .from('site_settings')
      .upsert(siteSettings, { onConflict: 'key' });
    
    if (settingsError) {
      console.error('❌ Erro ao inserir configurações:', settingsError);
    } else {
      console.log('✅ Configurações inseridas com sucesso!');
    }

    // Inserir navigation_links
    console.log('🔗 Inserindo links de navegação...');
    const { error: navError } = await supabase
      .from('navigation_links')
      .upsert(navigationLinks, { onConflict: 'title,position' });
    
    if (navError) {
      console.error('❌ Erro ao inserir links:', navError);
    } else {
      console.log('✅ Links inseridos com sucesso!');
    }

    // Inserir content_blocks
    console.log('📄 Inserindo blocos de conteúdo...');
    const { error: contentError } = await supabase
      .from('content_blocks')
      .upsert(contentBlocks, { onConflict: 'key' });
    
    if (contentError) {
      console.error('❌ Erro ao inserir blocos:', contentError);
    } else {
      console.log('✅ Blocos inseridos com sucesso!');
    }

    // Inserir newsletter_benefits
    console.log('📧 Inserindo benefícios do newsletter...');
    const { error: benefitsError } = await supabase
      .from('newsletter_benefits')
      .upsert(newsletterBenefits, { onConflict: 'title' });
    
    if (benefitsError) {
      console.error('❌ Erro ao inserir benefícios:', benefitsError);
    } else {
      console.log('✅ Benefícios inseridos com sucesso!');
    }

    console.log('🎉 População do banco concluída com sucesso!');

  } catch (error) {
    console.error('💥 Erro geral:', error);
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  populateDatabase();
}

export { populateDatabase };
