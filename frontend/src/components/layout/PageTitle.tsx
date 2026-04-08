type PageTitleProps = {
  breadcrumb: string;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export default function PageTitle({
  breadcrumb,
  title,
  description,
  action,
}: PageTitleProps) {
  return (
    <>
      <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        {breadcrumb}
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-5xl font-black text-slate-900">{title}</h2>
          <p className="text-slate-500">{description}</p>
        </div>

        {action}
      </div>
    </>
  );
}