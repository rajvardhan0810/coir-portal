import {
  BiAnalyse,
  BiBookOpen,
  BiBriefcaseAlt,
  BiBuildingHouse,
  BiBullseye,
  BiCog,
  BiGlobe,
  BiRocket,
  BiStore,
  BiSupport,
  BiWrench,
} from "react-icons/bi";

const iconMap = {
  "flaticon-consulting": BiBriefcaseAlt,
  "flaticon-effective": BiBullseye,
  "flaticon-startup": BiRocket,
  "flaticon-website": BiGlobe,
  "flaticon-consultant": BiSupport,
  "flaticon-project": BiBuildingHouse,
  "flaticon-bullhorn": BiStore,
  "flaticon-data-analytics": BiAnalyse,
  "flaticon-web-development": BiCog,
  default: BiBookOpen,
};

type ServiceIconProps = {
  name: string;
};

export function ServiceIcon({ name }: ServiceIconProps) {
  const Icon = iconMap[name as keyof typeof iconMap] ?? BiWrench;

  return (
    <span className="service-icon" aria-hidden>
      <Icon />
    </span>
  );
}
