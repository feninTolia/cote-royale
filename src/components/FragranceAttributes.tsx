import { FragranceDocumentData } from "@/../prismicio-types";
import { IconType } from "react-Icons";
import {
  LuCrown,
  LuDroplet,
  LuFlame,
  LuGem,
  LuTreePine,
  LuZap,
} from "react-icons/lu";

type AttributeData = { label: string; Icon: IconType };

const SCENT_PROFILES: Record<
  FragranceDocumentData["scent_profile"],
  AttributeData
> = {
  spicy: { label: "Spicy & Smoky", Icon: LuFlame },
  woody: { label: "Woody & Herbal", Icon: LuTreePine },
  fresh: { label: "Fresh & Aquatic", Icon: LuDroplet },
};

const MOODS: Record<FragranceDocumentData["mood"], AttributeData> = {
  bold: { label: "Bold & Seductive", Icon: LuCrown },
  grounded: { label: "Grounded & Sophisticated", Icon: LuGem },
  refreshing: { label: "Refreshing & Invigorating", Icon: LuZap },
};

type Props = {
  scentProfile: FragranceDocumentData["scent_profile"];
  mood: FragranceDocumentData["mood"];
  className?: string;
};

const FragranceAttributes = ({
  mood: providedMood,
  scentProfile: providedScentProfile,
  className,
}: Props) => {
  const scentProfile = SCENT_PROFILES[providedScentProfile];
  const mood = MOODS[providedMood];
  return (
    <div className={className}>
      <p className="mb-2 text-base font-semibold uppercase">Features</p>

      <div className="grid gap-2">
        <p className="flex items-center gap-2">
          <scentProfile.Icon className="size-6" />
          <span>{scentProfile.label}</span>
        </p>
        <p className="flex items-center gap-2">
          <mood.Icon className="size-6" />
          <span>{mood.label}</span>
        </p>
      </div>
    </div>
  );
};

export default FragranceAttributes;
