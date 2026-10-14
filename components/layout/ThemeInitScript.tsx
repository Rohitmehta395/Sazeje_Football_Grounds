"use client";

import { useServerInsertedHTML } from "next/navigation";

const BLOCKING_INIT_SCRIPT = `(function(){try{var t=document.cookie.match(/(?:^|; )theme=([^;]*)/);var m=t?t[1]:"light";document.documentElement.setAttribute("data-theme",m);var l=document.cookie.match(/(?:^|; )lang=([^;]*)/);var n=l?l[1]:"nl";document.documentElement.setAttribute("data-lang",n);}catch(e){}})();`;

export function ThemeInitScript() {
  useServerInsertedHTML(() => {
    return (
      <script
        id="theme-init"
        dangerouslySetInnerHTML={{ __html: BLOCKING_INIT_SCRIPT }}
      />
    );
  });

  return null;
}
