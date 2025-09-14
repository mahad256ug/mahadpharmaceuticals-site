import React from "react";
import { LucideIcon } from "lucide-react";

const ServiceCard = ({
  ...props
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) => {
  const Icon = props.icon;
  return (
    <div className="p-10 bg-white shadow-xl">
      <div>
        <Icon className="size-10 mb-3 stroke-black/60 stroke-1" />
        <h3 className="text-xl mb-3 uppercase text-green-500">{props.title}</h3>
        <p className="line-clamp-4">{props.description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
