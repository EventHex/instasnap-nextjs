const { default: Image } = require("next/image");

const SnapButton = ({ icon, buttonName, alt, className }) => {
  return (
    <button className={className}>
      <Image 
        src={icon} 
        alt={alt} 
        width={20} 
        height={20} 
        className="mr-2 h-5 w-5" 
      />
      {buttonName}
    </button>
  );
};

export default SnapButton;
