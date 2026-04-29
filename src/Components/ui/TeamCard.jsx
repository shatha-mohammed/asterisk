import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function TeamCard({ name, role, image, linkedin, github }) {
  return (
    <div className="group relative flex flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Avatar */}
      <div className="group-hover:ring-brand-accent/30 relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-indigo-100 transition-all duration-300">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-indigo-900">{name}</h3>
        <p className="text-muted text-sm">{role}</p>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-3">
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-brand-accent rounded-full p-2 transition-all duration-300 hover:bg-indigo-50"
            aria-label={`${name}'s LinkedIn`}
          >
            <FaLinkedin size={18} />
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-brand-accent rounded-full p-2 transition-all duration-300 hover:bg-indigo-50"
            aria-label={`${name}'s GitHub`}
          >
            <FaGithub size={18} />
          </a>
        )}
      </div>
    </div>
  );
}
