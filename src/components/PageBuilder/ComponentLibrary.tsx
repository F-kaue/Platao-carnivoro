import React from 'react';
import { useDrag } from 'react-dnd';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Type, 
  Image, 
  Layout, 
  MousePointer, 
  Video, 
  List, 
  Grid3X3,
  Quote,
  Code,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Star,
  Heart,
  Zap,
  Shield,
  Users,
  Award,
  Target,
  TrendingUp,
  Globe,
  FileText,
  BarChart3,
  PieChart,
  MessageSquare,
  Camera,
  Music,
  Download,
  Upload,
  Link,
  ExternalLink,
  Search,
  Filter,
  Settings,
  Bell,
  User,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Copy,
  Move,
  Plus,
  Minus,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Menu,
  MoreHorizontal,
  MoreVertical,
  Home,
  Info,
  HelpCircle,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Calendar as CalendarIcon,
  Tag,
  Hash,
  AtSign,
  DollarSign,
  Percent,
  Hash as HashIcon,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List as ListIcon,
  ListOrdered,
  Indent,
  Outdent,
  Quote as QuoteIcon,
  Code as CodeIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Table,
  Columns,
  Rows,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Diamond,
  Star as StarIcon,
  Heart as HeartIcon,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  Surprised,
  Confused,
  Wink,
  Kiss,
  Tongue,
  Sunglasses,
  Cool,
  Hot,
  Fire,
  Snowflake,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  Gauge,
  Activity,
  Pulse,
  Heart as HeartPulse,
  Brain,
  Cpu,
  HardDrive,
  Database,
  Server,
  Wifi,
  Bluetooth,
  Radio,
  Tv,
  Monitor as MonitorIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  Laptop,
  Desktop,
  Printer,
  Scanner,
  Keyboard,
  Mouse,
  Headphones,
  Speaker,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  RotateCcw,
  RotateCw,
  RefreshCw,
  RefreshCcw,
  Loader,
  Loader2,
  Spinner,
  Timer,
  Stopwatch,
  Hourglass,
  Sandglass,
  Clock as ClockIcon,
  Calendar as CalendarIcon2,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  CalendarRange,
  CalendarSearch,
  CalendarHeart,
  CalendarStar,
  CalendarUser,
  CalendarClock,
  CalendarEdit,
  CalendarTrash,
  CalendarLock,
  CalendarUnlock,
  CalendarEye,
  CalendarEyeOff,
  CalendarSettings,
  CalendarInfo,
  CalendarHelp,
  CalendarAlert,
  CalendarCheckCircle,
  CalendarXCircle,
  CalendarPlusCircle,
  CalendarMinusCircle,
  CalendarQuestion,
  CalendarExclamation,
  CalendarSlash,
  CalendarDot,
  CalendarCircle,
  CalendarSquare,
  CalendarTriangle,
  CalendarHexagon,
  CalendarDiamond,
  CalendarStar as CalendarStarIcon,
  CalendarHeart as CalendarHeartIcon,
  CalendarThumbsUp,
  CalendarThumbsDown,
  CalendarSmile,
  CalendarFrown,
  CalendarMeh,
  CalendarLaugh,
  CalendarAngry,
  CalendarSurprised,
  CalendarConfused,
  CalendarWink,
  CalendarKiss,
  CalendarTongue,
  CalendarSunglasses,
  CalendarCool,
  CalendarHot,
  CalendarFire,
  CalendarSnowflake,
  CalendarSun,
  CalendarMoon,
  CalendarCloud,
  CalendarCloudRain,
  CalendarCloudSnow,
  CalendarCloudLightning,
  CalendarWind,
  CalendarDroplets,
  CalendarThermometer,
  CalendarGauge,
  CalendarActivity,
  CalendarPulse,
  CalendarHeart as CalendarHeartPulse,
  CalendarBrain,
  CalendarCpu,
  CalendarHardDrive,
  CalendarDatabase,
  CalendarServer,
  CalendarWifi,
  CalendarBluetooth,
  CalendarRadio,
  CalendarTv,
  CalendarMonitor,
  CalendarSmartphone,
  CalendarTablet,
  CalendarLaptop,
  CalendarDesktop,
  CalendarPrinter,
  CalendarScanner,
  CalendarKeyboard,
  CalendarMouse,
  CalendarHeadphones,
  CalendarSpeaker,
  CalendarMic,
  CalendarMicOff,
  CalendarVolume2,
  CalendarVolumeX,
  CalendarPlay,
  CalendarPause,
  CalendarStop,
  CalendarSkipBack,
  CalendarSkipForward,
  CalendarRepeat,
  CalendarShuffle,
  CalendarRotateCcw,
  CalendarRotateCw,
  CalendarRefreshCw,
  CalendarRefreshCcw,
  CalendarLoader,
  CalendarLoader2,
  CalendarSpinner,
  CalendarTimer,
  CalendarStopwatch,
  CalendarHourglass,
  CalendarSandglass
} from 'lucide-react';

interface ComponentItemProps {
  type: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  category: string;
}

const ComponentItem: React.FC<ComponentItemProps> = ({ type, icon, label, description, category }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { type, category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 border border-gray-200 rounded-lg cursor-move hover:border-blue-300 hover:shadow-sm transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="text-gray-600">{icon}</div>
        <div className="flex-1">
          <h4 className="font-medium text-sm text-gray-900">{label}</h4>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

interface ComponentLibraryProps {
  onAddElement: (element: any) => void;
}

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ onAddElement }) => {
  const components = [
    // Text Components
    {
      category: 'Texto',
      items: [
        {
          type: 'heading',
          icon: <Type className="w-5 h-5" />,
          label: 'Cabeçalho',
          description: 'Títulos e subtítulos'
        },
        {
          type: 'paragraph',
          icon: <FileText className="w-5 h-5" />,
          label: 'Parágrafo',
          description: 'Texto simples'
        },
        {
          type: 'quote',
          icon: <Quote className="w-5 h-5" />,
          label: 'Citação',
          description: 'Texto destacado'
        },
        {
          type: 'list',
          icon: <List className="w-5 h-5" />,
          label: 'Lista',
          description: 'Lista de itens'
        }
      ]
    },
    // Media Components
    {
      category: 'Mídia',
      items: [
        {
          type: 'image',
          icon: <Image className="w-5 h-5" />,
          label: 'Imagem',
          description: 'Foto ou ilustração'
        },
        {
          type: 'video',
          icon: <Video className="w-5 h-5" />,
          label: 'Vídeo',
          description: 'Player de vídeo'
        },
        {
          type: 'gallery',
          icon: <Grid3X3 className="w-5 h-5" />,
          label: 'Galeria',
          description: 'Múltiplas imagens'
        }
      ]
    },
    // Layout Components
    {
      category: 'Layout',
      items: [
        {
          type: 'container',
          icon: <Layout className="w-5 h-5" />,
          label: 'Container',
          description: 'Agrupador de elementos'
        },
        {
          type: 'columns',
          icon: <Columns className="w-5 h-5" />,
          label: 'Colunas',
          description: 'Layout em colunas'
        },
        {
          type: 'spacer',
          icon: <Minus className="w-5 h-5" />,
          label: 'Espaçador',
          description: 'Espaço vazio'
        },
        {
          type: 'divider',
          icon: <Minus className="w-5 h-5" />,
          label: 'Divisor',
          description: 'Linha separadora'
        }
      ]
    },
    // Interactive Components
    {
      category: 'Interativo',
      items: [
        {
          type: 'button',
          icon: <MousePointer className="w-5 h-5" />,
          label: 'Botão',
          description: 'Botão clicável'
        },
        {
          type: 'form',
          icon: <Settings className="w-5 h-5" />,
          label: 'Formulário',
          description: 'Campos de entrada'
        },
        {
          type: 'newsletter',
          icon: <Mail className="w-5 h-5" />,
          label: 'Newsletter',
          description: 'Inscrição em email'
        }
      ]
    },
    // Content Components
    {
      category: 'Conteúdo',
      items: [
        {
          type: 'card',
          icon: <Card className="w-5 h-5" />,
          label: 'Card',
          description: 'Cartão de conteúdo'
        },
        {
          type: 'testimonial',
          icon: <Quote className="w-5 h-5" />,
          label: 'Depoimento',
          description: 'Avaliação de cliente'
        },
        {
          type: 'pricing',
          icon: <DollarSign className="w-5 h-5" />,
          label: 'Preços',
          description: 'Tabela de preços'
        },
        {
          type: 'faq',
          icon: <HelpCircle className="w-5 h-5" />,
          label: 'FAQ',
          description: 'Perguntas frequentes'
        }
      ]
    },
    // Social Components
    {
      category: 'Social',
      items: [
        {
          type: 'social-links',
          icon: <Users className="w-5 h-5" />,
          label: 'Links Sociais',
          description: 'Redes sociais'
        },
        {
          type: 'share',
          icon: <Share className="w-5 h-5" />,
          label: 'Compartilhar',
          description: 'Botões de compartilhamento'
        }
      ]
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {components.map((category, index) => (
        <div key={index}>
          <h3 className="font-semibold text-sm text-gray-700 mb-3 uppercase tracking-wide">
            {category.category}
          </h3>
          <div className="space-y-2">
            {category.items.map((item, itemIndex) => (
              <ComponentItem
                key={itemIndex}
                type={item.type}
                icon={item.icon}
                label={item.label}
                description={item.description}
                category={category.category}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
