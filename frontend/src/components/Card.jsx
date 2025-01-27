// components/Card.jsx
const Card = ({ children, variant }) => (
    <div className={`
      bg-white 
      rounded-3xl 
      shadow-lg 
      p-8
      ${variant === 'bordered' ? 'border border-green-100' : ''}
    `}>
      {children}
    </div>
  );
   
    export default Card;