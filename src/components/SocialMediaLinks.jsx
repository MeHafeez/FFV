import { socialMediaItems } from "../data/mockData";
import { Tooltip } from "@mui/material";

const SocialMediaLinks = () => {
  return (
    <div className="flex flex-col items-center gap-12">
      {socialMediaItems.map((item) => (
        <Tooltip title={item.tooltip} placement="right-start" key={item.id}>
          <a
            href={item.path}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:scale-110 transition-transform duration-300"
          >
            {item.icon}
          </a>
        </Tooltip>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
