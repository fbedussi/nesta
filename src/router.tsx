import { useEffect, useState } from "react";
import { NotFound } from "./pages/404";
import { Intro } from "./pages/intro";
import { Survey } from "./pages/survey";

type RouteComponent = React.ComponentType;

const routes: Record<string, RouteComponent> = {
	"/": Intro,
	"/survey": Survey,
};

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(pathname: string): string {
	return pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname;
}

/** Navigate programmatically to an app route, e.g. navigate('/survey') */
export function navigate(path: string) {
	navigation.navigate(base + path);
}

/** Drop-in replacement for <a> that automatically prepends the base path */
export function Link({
	href,
	children,
	...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
	return (
		<a href={base + href} {...props}>
			{children}
		</a>
	);
}

export function Router() {
	const [pathname, setPathname] = useState(() => stripBase(window.location.pathname));

	useEffect(() => {
		const controller = new AbortController();

		navigation.addEventListener(
			"navigate",
			(event: NavigateEvent) => {
				const url = new URL(event.destination.url);

				if (
					!event.canIntercept ||
					event.hashChange ||
					event.downloadRequest !== null
				) {
					return;
				}

				event.intercept({
					handler: async () => {
						setPathname(stripBase(url.pathname));
					},
				});
			},
			{ signal: controller.signal },
		);

		return () => controller.abort();
	}, []);

	const Page = routes[pathname] ?? NotFound;
	return <Page />;
}
