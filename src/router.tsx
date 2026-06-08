import { useEffect, useState } from "react";
import { NotFound } from "./pages/404";
import { Birth } from "./pages/birth";
import { Home } from "./pages/home";
import { Intro } from "./pages/intro";
import { Journey } from "./pages/journey";
import { Loading } from "./pages/loading";
import { LoadingApp } from "./pages/loadingApp";
import { Profile } from "./pages/profile";
import { Sos } from "./pages/sos";
import { Survey } from "./pages/survey";
import { TakePhoto } from "./pages/take-photo";
import { selectors, useStore } from "./store";

type RouteComponent = React.ComponentType;

const routes: Record<string, { page: RouteComponent; order: number }> = {
	"/": { page: Home, order: 6 },
	"/home": { page: Home, order: 6 },
	"/intro": { page: Intro, order: 1 },
	"/survey": { page: Survey, order: 2 },
	"/loading": { page: Loading, order: 3 },
	"/profile": { page: Profile, order: 4 },
	"/birth": { page: Birth, order: 5 },
	"/journey": { page: Journey, order: 7 },
	"/sos": { page: Sos, order: 8 },
	"/take-photo": { page: TakePhoto, order: 9 },
};

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(pathname: string): string {
	return pathname.startsWith(base)
		? pathname.slice(base.length) || "/"
		: pathname;
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
	const [pathname, setPathname] = useState(() =>
		stripBase(window.location.pathname),
	);
	const ready = useStore(selectors.ready);

	useEffect(() => {
		const controller = new AbortController();

		navigation.addEventListener(
			"navigate",
			(event: NavigateEvent) => {
				const sourceUrl = new URL(window.location.href);
				const destinationUrl = new URL(event.destination.url);

				if (
					!event.canIntercept ||
					event.hashChange ||
					event.downloadRequest !== null
				) {
					return;
				}

				event.intercept({
					handler: async () => {
						const destinationPathname = stripBase(destinationUrl.pathname);
						const changePage = () => setPathname(destinationPathname);
						if (!document.startViewTransition) {
							changePage();
						} else {
							const sourcePathname = stripBase(sourceUrl.pathname);
							const type =
								routes[destinationPathname].order < routes[sourcePathname].order
									? "back"
									: "forward";
							document.startViewTransition({
								update: changePage,
								types: [type],
							});
						}
					},
				});
			},
			{ signal: controller.signal },
		);

		return () => controller.abort();
	}, []);

	const Page = routes[pathname].page ?? NotFound;

	return ready ? <Page /> : <LoadingApp />;
}
