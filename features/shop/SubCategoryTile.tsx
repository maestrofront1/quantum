import * as React from "react";
import * as Router from "react-router-dom";

export default function SubcategoryTile({ category, keyName, title, icon,}:
{
  category: string;
  keyName: string;
  title: string;
  icon?: string;
}) {
  const img =
    icon ||
    "https://cdn.builder.io/api/v1/image/assets%2F6e25490faab747c9ae11c4bfdf90d663%2F13f224b0ae9a4e6d8fd387097fd1b1a7?format=webp&width=800";

  return (
    <Router.Link
      to={`/category/${category}/${keyName}`}
      className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition hover:shadow-md flex flex-col gap-2"
    >
      <div className="block w-full overflow-hidden">
        <div className="aspect-square w-full flex items-center justify-center bg-white/95 p-5 rounded-t-xl">
          <img src={img} alt={title} className="max-h-3/4 max-w-3/4 object-contain" />
        </div>
      </div>

      <div className="w-full bg-primary text-primary-foreground py-3 px-4 flex justify-center rounded-t-xl rounded-b-xl">
        <span className="text-sm font-medium">{title}</span>
      </div>
    </Router.Link>
  );
}
