import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://ylkitmkjcmvtkgzxapcs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsa2l0bWtqY212dGtnenhhcGNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNDg1MjYsImV4cCI6MjA3MjkyNDUyNn0.ofHoaODiDXVli1tf7UvIM_GmdfJ1vY6XNyt_uHlAie4"
);

async function populateDatabase() {
  console.log('🚀 Iniciando população do banco de dados...');

  try {
    // Inserir site_settings
    console.log('📝 Inserindo configurações do site...');
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
      }
    ];

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
      }
    ];

    const { error: navError } = await supabase
      .from('navigation_links')
      .upsert(navigationLinks, { onConflict: 'title,position' });
    
    if (navError) {
      console.error('❌ Erro ao inserir links:', navError);
    } else {
      console.log('✅ Links inseridos com sucesso!');
    }

    // Inserir newsletter_benefits
    console.log('📧 Inserindo benefícios do newsletter...');
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
      }
    ];

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

populateDatabase();
