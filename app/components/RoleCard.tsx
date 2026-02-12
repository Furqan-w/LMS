type RoleCardProps = {
  title: string;
  description: string;
  color: string;
};

export default function RoleCard({
  title,
  description,
  color,
}: RoleCardProps) {
  return (
    <div className="rounded-xl 
        bg-white 
        p-6 
        shadow-[6px_0_15px_-4px_rgba(0,0,0,0.15)]
        hover:shadow-[8px_0_20px_-4px_rgba(0,0,0,0.2)]
        transition">
      <h2 className={`text-2xl font-semibold ${color}`}>
        {title}
      </h2>

      <p className="mt-3 leading-relaxed text-gray-700">
        {description}
      </p>
    </div>
  );
}
