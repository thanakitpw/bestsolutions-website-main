type Props = {
  src: string;
  alt: string;
  url?: string;
};

function formatHost(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function CaseFrame({ src, alt, url }: Props) {
  return (
    <figure className="case-frame">
      <div className="case-frame-bar" aria-hidden="true">
        <span className="case-frame-dots">
          <span></span><span></span><span></span>
        </span>
        {url ? (
          <span className="case-frame-url">{formatHost(url)}</span>
        ) : null}
      </div>
      <div className="case-frame-viewport" tabIndex={0} data-lenis-prevent>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="case-frame-img" loading="eager" />
      </div>
    </figure>
  );
}
