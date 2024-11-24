import Award from './Award'
import Nomination from './Nomination'
import Finalist from './Finalist'

export default function Mention({ project }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Award':
        return <Award className="w-7 h-7" />;
      case 'Finalist':
        return <Finalist className="w-6 h-6" />;
      case 'Nomination':
        return <Nomination className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return project.mentions && project.mentions.length > 0 && (
    <ul className="mt-4 pt-5 text-sm border-t border-slate-600">
      {project.mentions.map((mention, index) => (
        <li key={index} className="mb-3 flex items-start">
          <div className="w-8 mr-2 flex items-center justify-center">
            {mention.icon && getIcon(mention.icon)}
          </div>
          <div className="flex-1">
            <p className="leading-3 text-sm text-gray-200/60">{mention.mentioner}</p>
            <p className="leading-0 text-xl text-gray-200/80">{mention.mention}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
