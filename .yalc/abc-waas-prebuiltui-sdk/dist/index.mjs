import * as React2 from 'react';
import { useState, useCallback, useEffect } from 'react';
import 'react-dom';
import { useSnsLogin } from 'abc-waas-sdk';
import { createRemoteJWKSet, jwtVerify, SignJWT } from 'jose';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// node_modules/@remix-run/router/dist/router.js
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo2, _ref, index) => {
    let {
      paramName,
      isOptional
    } = _ref;
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value = captureGroups[index];
    if (isOptional && !value) {
      memo2[paramName] = void 0;
    } else {
      memo2[paramName] = (value || "").replace(/%2F/g, "/");
    }
    return memo2;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function getResolveToMatches(matches, v7_relativeSplatPath) {
  let pathMatches = getPathContributingMatches(matches);
  if (v7_relativeSplatPath) {
    return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
  }
  return pathMatches.map((match) => match.pathnameBase);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var validMutationMethodsArr = ["post", "put", "patch", "delete"];
new Set(validMutationMethodsArr);
var validRequestMethodsArr = ["get", ...validMutationMethodsArr];
new Set(validRequestMethodsArr);

// node_modules/react-router/dist/index.js
function _extends2() {
  _extends2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends2.apply(this, arguments);
}
var DataRouterContext = /* @__PURE__ */ React2.createContext(null);
if (process.env.NODE_ENV !== "production") {
  DataRouterContext.displayName = "DataRouter";
}
var DataRouterStateContext = /* @__PURE__ */ React2.createContext(null);
if (process.env.NODE_ENV !== "production") {
  DataRouterStateContext.displayName = "DataRouterState";
}
var AwaitContext = /* @__PURE__ */ React2.createContext(null);
if (process.env.NODE_ENV !== "production") {
  AwaitContext.displayName = "Await";
}
var NavigationContext = /* @__PURE__ */ React2.createContext(null);
if (process.env.NODE_ENV !== "production") {
  NavigationContext.displayName = "Navigation";
}
var LocationContext = /* @__PURE__ */ React2.createContext(null);
if (process.env.NODE_ENV !== "production") {
  LocationContext.displayName = "Location";
}
var RouteContext = /* @__PURE__ */ React2.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
if (process.env.NODE_ENV !== "production") {
  RouteContext.displayName = "Route";
}
var RouteErrorContext = /* @__PURE__ */ React2.createContext(null);
if (process.env.NODE_ENV !== "production") {
  RouteErrorContext.displayName = "RouteError";
}
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ? process.env.NODE_ENV !== "production" ? invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  let {
    basename,
    navigator
  } = React2.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return React2.useContext(LocationContext) != null;
}
function useLocation() {
  !useInRouterContext() ? process.env.NODE_ENV !== "production" ? invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  return React2.useContext(LocationContext).location;
}
var navigateEffectWarning = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function useIsomorphicLayoutEffect(cb) {
  let isStatic = React2.useContext(NavigationContext).static;
  if (!isStatic) {
    React2.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let {
    isDataRoute
  } = React2.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  !useInRouterContext() ? process.env.NODE_ENV !== "production" ? invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  let dataRouterContext = React2.useContext(DataRouterContext);
  let {
    basename,
    future,
    navigator
  } = React2.useContext(NavigationContext);
  let {
    matches
  } = React2.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  let activeRef = React2.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = React2.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    process.env.NODE_ENV !== "production" ? warning(activeRef.current, navigateEffectWarning) : void 0;
    if (!activeRef.current) return;
    if (typeof to === "number") {
      navigator.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    if (dataRouterContext == null && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    future
  } = React2.useContext(NavigationContext);
  let {
    matches
  } = React2.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  return React2.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
var DataRouterHook = /* @__PURE__ */ (function(DataRouterHook3) {
  DataRouterHook3["UseBlocker"] = "useBlocker";
  DataRouterHook3["UseRevalidator"] = "useRevalidator";
  DataRouterHook3["UseNavigateStable"] = "useNavigate";
  return DataRouterHook3;
})(DataRouterHook || {});
var DataRouterStateHook = /* @__PURE__ */ (function(DataRouterStateHook3) {
  DataRouterStateHook3["UseBlocker"] = "useBlocker";
  DataRouterStateHook3["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook3["UseActionData"] = "useActionData";
  DataRouterStateHook3["UseRouteError"] = "useRouteError";
  DataRouterStateHook3["UseNavigation"] = "useNavigation";
  DataRouterStateHook3["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook3["UseMatches"] = "useMatches";
  DataRouterStateHook3["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook3["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook3["UseRouteId"] = "useRouteId";
  return DataRouterStateHook3;
})(DataRouterStateHook || {});
function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function useDataRouterContext(hookName) {
  let ctx = React2.useContext(DataRouterContext);
  !ctx ? process.env.NODE_ENV !== "production" ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false) : void 0;
  return ctx;
}
function useRouteContext(hookName) {
  let route = React2.useContext(RouteContext);
  !route ? process.env.NODE_ENV !== "production" ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false) : void 0;
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ? process.env.NODE_ENV !== "production" ? invariant(false, hookName + ' can only be used on routes that contain a unique "id"') : invariant(false) : void 0;
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId(DataRouterStateHook.UseRouteId);
}
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseNavigateStable);
  let id = useCurrentRouteId(DataRouterStateHook.UseNavigateStable);
  let activeRef = React2.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = React2.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    process.env.NODE_ENV !== "production" ? warning(activeRef.current, navigateEffectWarning) : void 0;
    if (!activeRef.current) return;
    if (typeof to === "number") {
      router.navigate(to);
    } else {
      router.navigate(to, _extends2({
        fromRouteId: id
      }, options));
    }
  }, [router, id]);
  return navigate;
}
new Promise(() => {
});

// node_modules/react-router-dom/dist/index.js
function _extends3() {
  _extends3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends3.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    process.env.NODE_ENV !== "production" ? warning(false, '"' + encType + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + defaultEncType + '"')) : void 0;
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let {
        name,
        type,
        value
      } = target;
      if (type === "image") {
        let prefix = name ? name + "." : "";
        formData.append(prefix + "x", "0");
        formData.append(prefix + "y", "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return {
    action,
    method: method.toLowerCase(),
    encType,
    formData,
    body
  };
}
var _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"];
var _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"];
var _excluded3 = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"];
var REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e) {
}
var ViewTransitionContext = /* @__PURE__ */ React2.createContext({
  isTransitioning: false
});
if (process.env.NODE_ENV !== "production") {
  ViewTransitionContext.displayName = "ViewTransition";
}
var FetchersContext = /* @__PURE__ */ React2.createContext(/* @__PURE__ */ new Map());
if (process.env.NODE_ENV !== "production") {
  FetchersContext.displayName = "Fetchers";
}
if (process.env.NODE_ENV !== "production") ;
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Link = /* @__PURE__ */ React2.forwardRef(function LinkWithRef(_ref7, ref) {
  let {
    onClick,
    relative,
    reloadDocument,
    replace: replace2,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition
  } = _ref7, rest = _objectWithoutPropertiesLoose(_ref7, _excluded);
  let {
    basename
  } = React2.useContext(NavigationContext);
  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && ABSOLUTE_URL_REGEX.test(to)) {
    absoluteHref = to;
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = stripBasename(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e) {
        process.env.NODE_ENV !== "production" ? warning(false, '<Link to="' + to + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.') : void 0;
      }
    }
  }
  let href = useHref(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace: replace2,
    state,
    target,
    preventScrollReset,
    relative,
    viewTransition
  });
  function handleClick(event) {
    if (onClick) onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ React2.createElement("a", _extends3({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref,
      target
    }))
  );
});
if (process.env.NODE_ENV !== "production") {
  Link.displayName = "Link";
}
var NavLink = /* @__PURE__ */ React2.forwardRef(function NavLinkWithRef(_ref8, ref) {
  let {
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children
  } = _ref8, rest = _objectWithoutPropertiesLoose(_ref8, _excluded2);
  let path = useResolvedPath(to, {
    relative: rest.relative
  });
  let location = useLocation();
  let routerState = React2.useContext(DataRouterStateContext);
  let {
    navigator,
    basename
  } = React2.useContext(NavigationContext);
  let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useViewTransitionState(path) && viewTransition === true;
  let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
  let locationPathname = location.pathname;
  let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
    toPathname = toPathname.toLowerCase();
  }
  if (nextLocationPathname && basename) {
    nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
  }
  const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
  let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
  let renderProps = {
    isActive,
    isPending,
    isTransitioning
  };
  let ariaCurrent = isActive ? ariaCurrentProp : void 0;
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp(renderProps);
  } else {
    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null, isTransitioning ? "transitioning" : null].filter(Boolean).join(" ");
  }
  let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
  return /* @__PURE__ */ React2.createElement(Link, _extends3({}, rest, {
    "aria-current": ariaCurrent,
    className,
    ref,
    style,
    to,
    viewTransition
  }), typeof children === "function" ? children(renderProps) : children);
});
if (process.env.NODE_ENV !== "production") {
  NavLink.displayName = "NavLink";
}
var Form = /* @__PURE__ */ React2.forwardRef((_ref9, forwardedRef) => {
  let {
    fetcherKey,
    navigate,
    reloadDocument,
    replace: replace2,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition
  } = _ref9, props = _objectWithoutPropertiesLoose(_ref9, _excluded3);
  let submit = useSubmit();
  let formAction = useFormAction(action, {
    relative
  });
  let formMethod = method.toLowerCase() === "get" ? "get" : "post";
  let submitHandler = (event) => {
    onSubmit && onSubmit(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    let submitter = event.nativeEvent.submitter;
    let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
    submit(submitter || event.currentTarget, {
      fetcherKey,
      method: submitMethod,
      navigate,
      replace: replace2,
      state,
      relative,
      preventScrollReset,
      viewTransition
    });
  };
  return /* @__PURE__ */ React2.createElement("form", _extends3({
    ref: forwardedRef,
    method: formMethod,
    action: formAction,
    onSubmit: reloadDocument ? onSubmit : submitHandler
  }, props));
});
if (process.env.NODE_ENV !== "production") {
  Form.displayName = "Form";
}
if (process.env.NODE_ENV !== "production") ;
var DataRouterHook2;
(function(DataRouterHook3) {
  DataRouterHook3["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook3["UseSubmit"] = "useSubmit";
  DataRouterHook3["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook3["UseFetcher"] = "useFetcher";
  DataRouterHook3["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook2 || (DataRouterHook2 = {}));
var DataRouterStateHook2;
(function(DataRouterStateHook3) {
  DataRouterStateHook3["UseFetcher"] = "useFetcher";
  DataRouterStateHook3["UseFetchers"] = "useFetchers";
  DataRouterStateHook3["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook2 || (DataRouterStateHook2 = {}));
function getDataRouterConsoleError2(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function useDataRouterContext2(hookName) {
  let ctx = React2.useContext(DataRouterContext);
  !ctx ? process.env.NODE_ENV !== "production" ? invariant(false, getDataRouterConsoleError2(hookName)) : invariant(false) : void 0;
  return ctx;
}
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative,
    viewTransition
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, {
    relative
  });
  return React2.useCallback((event) => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
      navigate(to, {
        replace: replace2,
        state,
        preventScrollReset,
        relative,
        viewTransition
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative, viewTransition]);
}
function validateClientSideSubmission() {
  if (typeof document === "undefined") {
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
  }
}
var fetcherId = 0;
var getUniqueFetcherId = () => "__" + String(++fetcherId) + "__";
function useSubmit() {
  let {
    router
  } = useDataRouterContext2(DataRouterHook2.UseSubmit);
  let {
    basename
  } = React2.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  return React2.useCallback(function(target, options) {
    if (options === void 0) {
      options = {};
    }
    validateClientSideSubmission();
    let {
      action,
      method,
      encType,
      formData,
      body
    } = getFormSubmissionInfo(target, basename);
    if (options.navigate === false) {
      let key = options.fetcherKey || getUniqueFetcherId();
      router.fetch(key, currentRouteId, options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        flushSync: options.flushSync
      });
    } else {
      router.navigate(options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        replace: options.replace,
        state: options.state,
        fromRouteId: currentRouteId,
        flushSync: options.flushSync,
        viewTransition: options.viewTransition
      });
    }
  }, [router, basename, currentRouteId]);
}
function useFormAction(action, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    basename
  } = React2.useContext(NavigationContext);
  let routeContext = React2.useContext(RouteContext);
  !routeContext ? process.env.NODE_ENV !== "production" ? invariant(false, "useFormAction must be used inside a RouteContext") : invariant(false) : void 0;
  let [match] = routeContext.matches.slice(-1);
  let path = _extends3({}, useResolvedPath(action ? action : ".", {
    relative
  }));
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v) => v === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? "?" + qs : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function useViewTransitionState(to, opts) {
  if (opts === void 0) {
    opts = {};
  }
  let vtContext = React2.useContext(ViewTransitionContext);
  !(vtContext != null) ? process.env.NODE_ENV !== "production" ? invariant(false, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : invariant(false) : void 0;
  let {
    basename
  } = useDataRouterContext2(DataRouterHook2.useViewTransitionState);
  let path = useResolvedPath(to, {
    relative: opts.relative
  });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}

// src/assets/icons/providers/icon_google.svg
var icon_google_default = 'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M20.64 12.2062C20.64 11.5687 20.5837 10.9537 20.475 10.365H12V13.8487H16.845C16.6312 14.97 15.9937 15.9187 15.0375 16.5562V18.825H17.9587C19.6575 17.2537 20.64 14.9437 20.64 12.2062Z" fill="%234285F4"/>%0A<path d="M12.0001 20.9999C14.4301 20.9999 16.4663 20.1974 17.9551 18.8249L15.0338 16.5599C14.2313 17.0999 13.2076 17.4262 12.0001 17.4262C9.66011 17.4262 7.67261 15.8474 6.96011 13.7212H3.96387V16.0462C5.44511 18.9787 8.48261 20.9999 12.0001 20.9999Z" fill="%2334A853"/>%0A<path d="M6.95999 13.7101C6.77999 13.1701 6.67499 12.5963 6.67499 12.0001C6.67499 11.4038 6.77999 10.8301 6.95999 10.2901V7.96509H3.96375C3.3525 9.17634 3 10.5451 3 12.0001C3 13.4551 3.3525 14.8238 3.96375 16.0351L6.29624 14.2201C6.29624 14.2163 6.95999 13.7101 6.95999 13.7101Z" fill="%23FBBC05"/>%0A<path d="M12.0001 6.58499C13.3238 6.58499 14.5051 7.04249 15.4463 7.92749L18.0226 5.35125C16.4588 3.8925 14.4301 3 12.0001 3C8.48261 3 5.44511 5.02125 3.96387 7.96499L6.96011 10.29C7.67261 8.16374 9.66011 6.58499 12.0001 6.58499Z" fill="%23EA4335"/>%0A</svg>%0A';

// src/assets/icons/providers/icon_apple.svg
var icon_apple_default = 'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M19.6209 8.818C19.5049 8.908 17.4569 10.062 17.4569 12.628C17.4569 15.596 20.0629 16.646 20.1409 16.672C20.1289 16.736 19.7269 18.11 18.7669 19.51C17.9109 20.742 17.0169 21.972 15.6569 21.972C14.2969 21.972 13.9469 21.182 12.3769 21.182C10.8469 21.182 10.3029 21.998 9.05889 21.998C7.81489 21.998 6.94689 20.858 5.94889 19.458C4.79289 17.814 3.85889 15.26 3.85889 12.836C3.85889 8.948 6.38689 6.886 8.87489 6.886C10.1969 6.886 11.2989 7.754 12.1289 7.754C12.9189 7.754 14.1509 6.834 15.6549 6.834C16.2249 6.834 18.2729 6.886 19.6209 8.818ZM14.9409 5.188C15.5629 4.45 16.0029 3.426 16.0029 2.402C16.0029 2.26 15.9909 2.116 15.9649 2C14.9529 2.038 13.7489 2.674 13.0229 3.516C12.4529 4.164 11.9209 5.188 11.9209 6.226C11.9209 6.382 11.9469 6.538 11.9589 6.588C12.0229 6.6 12.1269 6.614 12.2309 6.614C13.1389 6.614 14.2809 6.006 14.9409 5.188Z" fill="black"/>%0A</svg>%0A';

// src/assets/icons/providers/icon_kakao.svg
var icon_kakao_default = 'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path fill-rule="evenodd" clip-rule="evenodd" d="M11.7714 3C6.60457 3 2 6.57486 2 10.9846C2 13.7263 3.78114 16.1446 6.49314 17.5823L5.352 21.7709C5.25086 22.1417 5.67257 22.4366 5.996 22.2217L10.9983 18.9046C11.42 18.9451 11.8491 18.9691 11.7714 18.9691C17.9663 18.9691 22.0571 15.3937 22.0571 10.9846C22.0571 6.57486 17.9663 3 11.7714 3Z" fill="black" fill-opacity="0.902"/>%0A</svg>%0A';

// src/assets/icons/providers/icon_naver.svg
var icon_naver_default = 'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M14.8531 12.4933L8.9129 4H4V19.8678H9.15703V11.3744L15.0871 19.8678H20V4H14.8531V12.4933Z" fill="%2303C75A"/>%0A</svg>%0A';

// src/assets/icons/providers/icon_line.svg
var icon_line_default = 'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M21.9991 11.0911C21.9991 6.6297 17.5134 3 11.9995 3C6.48568 3 2 6.6297 2 11.0911C2 15.0909 5.55781 18.4402 10.3631 19.0739C10.6883 19.1439 11.1316 19.2879 11.2441 19.5654C11.3453 19.8177 11.3097 20.2121 11.2769 20.4672C11.2769 20.4672 11.1598 21.1709 11.1344 21.3205C11.0904 21.5728 10.9339 22.3064 12.0005 21.8578C13.068 21.4092 17.7589 18.4767 19.8565 16.0694C21.3055 14.4844 22 12.877 22 11.0911H21.9991ZM8.47172 13.477C8.47172 13.5826 8.38643 13.6676 8.28052 13.6676H5.47158C5.36567 13.6676 5.28038 13.5826 5.28038 13.477V13.4742V9.12582C5.28038 9.02022 5.36567 8.93518 5.47158 8.93518H6.18108C6.28605 8.93518 6.37228 9.02115 6.37228 9.12582V12.5798H8.28146C8.38643 12.5798 8.47266 12.6658 8.47266 12.7705V13.4779L8.47172 13.477ZM10.1625 13.477C10.1625 13.5816 10.0772 13.6676 9.97132 13.6676H9.26182C9.15685 13.6676 9.07062 13.5826 9.07062 13.477V9.12582C9.07062 9.02115 9.15591 8.93518 9.26182 8.93518H9.97132C10.0772 8.93518 10.1625 9.02022 10.1625 9.12582V13.477ZM14.9903 13.477C14.9903 13.5816 14.905 13.6676 14.7991 13.6676H14.0943C14.0774 13.6676 14.0605 13.6648 14.0446 13.6611C14.0446 13.6611 14.0427 13.6611 14.0418 13.6611C14.0371 13.6601 14.0334 13.6583 14.0287 13.6573C14.0268 13.6573 14.0249 13.6555 14.0231 13.6555C14.0202 13.6545 14.0165 13.6527 14.0137 13.6517C14.0109 13.6499 14.0071 13.6489 14.0043 13.6471C14.0024 13.6461 14.0006 13.6452 13.9987 13.6443C13.9949 13.6424 13.9903 13.6396 13.9865 13.6368C13.9865 13.6368 13.9846 13.6358 13.9846 13.6349C13.9659 13.6218 13.949 13.6059 13.935 13.5872L11.9358 10.8949V13.4788C11.9358 13.5835 11.8505 13.6695 11.7446 13.6695H11.0351C10.9301 13.6695 10.8439 13.5844 10.8439 13.4788V9.12769C10.8439 9.02302 10.9292 8.93705 11.0351 8.93705H11.7399C11.7399 8.93705 11.7446 8.93705 11.7465 8.93705C11.7502 8.93705 11.753 8.93705 11.7568 8.93705C11.7605 8.93705 11.7633 8.93705 11.7671 8.93798C11.7699 8.93798 11.7727 8.93798 11.7755 8.93892C11.7793 8.93892 11.783 8.94078 11.7868 8.94172C11.7887 8.94172 11.7915 8.94265 11.7933 8.94359C11.7971 8.94452 11.8008 8.94639 11.8046 8.94733C11.8065 8.94733 11.8083 8.9492 11.8111 8.9492C11.8149 8.95106 11.8186 8.952 11.8224 8.95387C11.8243 8.9548 11.8261 8.95574 11.828 8.95667C11.8318 8.95854 11.8355 8.96041 11.8383 8.96228C11.8402 8.96321 11.8421 8.96415 11.8439 8.96602C11.8477 8.96789 11.8505 8.97069 11.8543 8.97256C11.8561 8.97349 11.858 8.97536 11.8599 8.9763C11.8636 8.9791 11.8664 8.9819 11.8702 8.98471C11.8711 8.98564 11.873 8.98658 11.8739 8.98751C11.8777 8.99125 11.8814 8.99499 11.8852 8.99966C11.8852 8.99966 11.8852 8.99966 11.8861 9.00059C11.8917 9.00714 11.8964 9.01368 11.9011 9.02022L13.8975 11.7089V9.12489C13.8975 9.02022 13.9828 8.93424 14.0887 8.93424H14.7982C14.9031 8.93424 14.9894 9.01928 14.9894 9.12489V13.476L14.9903 13.477ZM18.863 9.83232C18.863 9.93792 18.7777 10.023 18.6718 10.023H16.7626V10.7575H18.6718C18.7768 10.7575 18.863 10.8435 18.863 10.9481V11.6556C18.863 11.7612 18.7777 11.8462 18.6718 11.8462H16.7626V12.5808H18.6718C18.7768 12.5808 18.863 12.6667 18.863 12.7714V13.4788C18.863 13.5844 18.7777 13.6695 18.6718 13.6695H15.8629C15.757 13.6695 15.6717 13.5844 15.6717 13.4788V13.476V9.13236V9.12769C15.6717 9.02209 15.757 8.93705 15.8629 8.93705H18.6718C18.7768 8.93705 18.863 9.02302 18.863 9.12769V9.83513V9.83232Z" fill="white"/>%0A</svg>%0A';

// src/assets/animations/common/animation_loading.svg
var animation_loading_default = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style="shape-rendering: auto; display: block; background: transparent;" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle stroke-dasharray="164.93361431346415 56.97787143782138" r="35" stroke-width="12" stroke="%237c36f7" fill="none" cy="50" cx="50">%0A  <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>%0A</circle><g></g></g><!-- [ldio] generated by https://loading.io --></svg>';

// src/utilities/google.ts
var getGoogleToken = async (code, clientId, clientSecret, redirectUri) => {
  try {
    const payload = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    });
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload.toString()
    });
    const data = await response.json();
    if (!(data == null ? void 0 : data.id_token)) {
      throw new Error("Failed to receive id_token from Google.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var getGoogleTokeninfo = async (idToken) => {
  try {
    const payload = new URLSearchParams({
      idToken
    });
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/tokeninfo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: payload.toString()
      }
    );
    const data = await response.json();
    if (!(data == null ? void 0 : data.email)) {
      throw new Error("Failed to receive email from Google.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// src/utilities/naver.ts
var getNaverToken = async (code, clientId, clientSecret, redirectUri) => {
  try {
    const payload = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    });
    const response = await fetch("/proxy/naver/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload.toString()
    });
    const data = await response.json();
    if (!(data == null ? void 0 : data.access_token)) {
      throw new Error("Failed to receive access_token from Naver.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var getNaverTokeninfo = async (accessToken) => {
  var _a;
  try {
    const response = await fetch("/proxy/naver/tokeninfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    if (!(data == null ? void 0 : data.message) || (data == null ? void 0 : data.message) !== "success") {
      throw new Error("Failed to receive message from Naver.");
    }
    if (!(data == null ? void 0 : data.resultcode) || (data == null ? void 0 : data.resultcode) !== "00") {
      throw new Error("Failed to receive resultcode from Naver.");
    }
    if (!((_a = data == null ? void 0 : data.response) == null ? void 0 : _a.email)) {
      throw new Error("Failed to receive email from Naver.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// src/utilities/line.ts
var getLineToken = async (code, clientId, clientSecret, redirectUri) => {
  try {
    const payload = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    });
    const response = await fetch("https://api.line.me/oauth2/v2.1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload.toString()
    });
    const data = await response.json();
    if (!(data == null ? void 0 : data.id_token)) {
      throw new Error("Failed to receive id_token from Line.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var getLineTokeninfo = async (idToken, clientId) => {
  try {
    const payload = new URLSearchParams({
      id_token: idToken,
      client_id: clientId
    });
    const response = await fetch("https://api.line.me/oauth2/v2.1/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload.toString()
    });
    const data = await response.json();
    if (!(data == null ? void 0 : data.email)) {
      throw new Error("Failed to receive email from Line.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var getKakaoToken = async (code, clientId, redirectUri) => {
  try {
    const payload = new URLSearchParams({
      code,
      client_id: clientId,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    });
    const response = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload.toString()
    });
    const data = await response.json();
    if (!(data == null ? void 0 : data.id_token)) {
      throw new Error("Failed to receive id_token from Kakao.");
    }
    if (!(data == null ? void 0 : data.access_token)) {
      throw new Error("Failed to receive access_token from Kakao.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var verifyKakaoToken = async (idToken, restApiKey) => {
  try {
    const KAKAO_ISS = "https://kauth.kakao.com";
    const KAKAO_JWKS_URL = `${KAKAO_ISS}/.well-known/jwks.json`;
    const kakaoJwks = createRemoteJWKSet(new URL(KAKAO_JWKS_URL));
    const { payload: data } = await jwtVerify(idToken, kakaoJwks, {
      issuer: KAKAO_ISS,
      audience: restApiKey
    });
    const currentTimeInSeconds = Math.floor(Date.now() / 1e3);
    if (!(data == null ? void 0 : data.email)) {
      throw new Error("Failed to receive email from Kakao.");
    }
    if (!(data == null ? void 0 : data.iss) || (data == null ? void 0 : data.iss) !== KAKAO_ISS) {
      throw new Error("Invalid issuer from Kakao.");
    }
    if (!(data == null ? void 0 : data.aud) || (data == null ? void 0 : data.aud) !== restApiKey) {
      throw new Error("Invalid audience from Kakao.");
    }
    if (!(data == null ? void 0 : data.exp) || currentTimeInSeconds >= (data == null ? void 0 : data.exp)) {
      throw new Error("id_token is expired from Kakao.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var getKakaoTokeninfo = async (accessToken) => {
  var _a;
  try {
    const response = await fetch("https://kapi.kakao.com/v2/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    if (!((_a = data == null ? void 0 : data.kakao_account) == null ? void 0 : _a.email)) {
      throw new Error("Failed to receive email from Kakao.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var getAppleToken = async (code, clientId, clientSecret, redirectUri) => {
  var _a;
  try {
    const payload = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    });
    const response = await fetch("/proxy/apple/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload.toString()
    });
    const data = await response.json();
    if (!(data == null ? void 0 : data.id_token)) {
      throw new Error("Failed to receive id_token from Apple.");
    }
    const decodedData = JSON.parse(atob((_a = data == null ? void 0 : data.id_token) == null ? void 0 : _a.split(".")[1]));
    if (!(decodedData == null ? void 0 : decodedData.email)) {
      throw new Error("Failed to receive email from Apple.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var verifyAppleToken = async (idToken, clientId) => {
  try {
    const APPLE_ISS = "https://appleid.apple.com";
    const APPLE_JWKS_URL = "https://appleid.apple.com/auth/keys";
    const appleJwks = createRemoteJWKSet(new URL(APPLE_JWKS_URL));
    const { payload: data } = await jwtVerify(idToken, appleJwks, {
      issuer: APPLE_ISS,
      audience: clientId
    });
    const currentTimeInSeconds = Math.floor(Date.now() / 1e3);
    if (!(data == null ? void 0 : data.email)) {
      throw new Error("Failed to receive email from Apple.");
    }
    if (!(data == null ? void 0 : data.iss) || (data == null ? void 0 : data.iss) !== APPLE_ISS) {
      throw new Error("Invalid issuer from Apple.");
    }
    if (!(data == null ? void 0 : data.aud) || (data == null ? void 0 : data.aud) !== clientId) {
      throw new Error("Invalid audience from Apple.");
    }
    if (!(data == null ? void 0 : data.exp) || currentTimeInSeconds >= (data == null ? void 0 : data.exp)) {
      throw new Error("id_token is expired from Apple.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var createAppleClientSecret = async (idToken, privateKey, teamId, keyId) => {
  try {
    const alg = "ES256";
    const base64Payload = idToken.split(".")[1];
    const payloadString = atob(base64Payload);
    const payload = JSON.parse(payloadString);
    const audience = payload.aud;
    const issuer = payload.iss;
    if (!audience || !issuer) {
      throw new Error("Invalid id_token: missing aud or iss.");
    }
    const base64Key = privateKey.replace("-----BEGIN PRIVATE KEY-----", "").replace("-----END PRIVATE KEY-----", "").replace(/\s+/g, "");
    const rawKey = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0));
    const cryptoKey = await crypto.subtle.importKey(
      "pkcs8",
      rawKey.buffer,
      { name: "ECDSA", namedCurve: "P-256" },
      false,
      ["sign"]
    );
    const jwt = await new SignJWT({}).setProtectedHeader({ alg, kid: keyId }).setIssuer(teamId).setIssuedAt().setExpirationTime("1h").setAudience(issuer).setSubject(audience).sign(cryptoKey);
    return jwt;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
var providers = [
  {
    type: "google",
    label: "Google\uB85C \uACC4\uC18D\uD558\uAE30",
    icon: icon_google_default,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    hoverColor: "#f7f7f7",
    border: "1px solid #dadce0"
  },
  {
    type: "apple",
    label: "Apple\uB85C \uACC4\uC18D\uD558\uAE30",
    icon: icon_apple_default,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    hoverColor: "#f7f7f7",
    border: "1px solid #dadce0"
  },
  {
    type: "naver",
    label: "\uB124\uC774\uBC84\uB85C \uACC4\uC18D\uD558\uAE30",
    icon: icon_naver_default,
    backgroundColor: "#ffffff",
    textColor: "#000000",
    hoverColor: "#f7f7f7",
    border: "1px solid #dadce0"
  },
  {
    type: "kakao",
    label: "\uCE74\uCE74\uC624\uB85C \uACC4\uC18D\uD558\uAE30",
    icon: icon_kakao_default,
    backgroundColor: "#FEE500",
    textColor: "#000000",
    hoverColor: "#ecd900",
    border: "1px solid #FEE500"
  },
  {
    type: "line",
    label: "LINE\uC73C\uB85C \uACC4\uC18D\uD558\uAE30",
    icon: icon_line_default,
    backgroundColor: "#03C75A",
    textColor: "#ffffff",
    hoverColor: "#02b94e",
    border: "1px solid #03C75A"
  }
];
var RETURN_URL = "/";
var containerStyle = {
  margin: "40px",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #dadce0",
  color: "#333",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all"
};
var titleContainerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center"
};
var contentContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};
var buttonBaseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "8px",
  width: "100%",
  marginBottom: "12px",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  wordBreak: "break-all"
};
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    snsLoginV2,
    error: errorSnsLogin,
    service: serviceSnsLogin
  } = useSnsLogin();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleRedirect = (provider) => {
    localStorage.setItem("provider", provider);
    if (provider === "google") {
      if (!process.env.REACT_APP_GOOGLE_CLIENT_ID || !process.env.REACT_APP_GOOGLE_REDIRECT_URI) {
        throw new Error("Google client ID or redirect URI is not set.");
      }
      const state = crypto.randomUUID();
      localStorage.setItem("google_oauth_state", state);
      const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      url.searchParams.set("client_id", process.env.REACT_APP_GOOGLE_CLIENT_ID);
      url.searchParams.set(
        "redirect_uri",
        process.env.REACT_APP_GOOGLE_REDIRECT_URI
      );
      url.searchParams.set("response_type", "code");
      url.searchParams.set(
        "scope",
        "https://www.googleapis.com/auth/userinfo.email"
      );
      url.searchParams.set("prompt", "consent");
      url.searchParams.set("access_type", "offline");
      url.searchParams.set("state", state);
      window.location.href = url.toString();
    } else if (provider === "apple") {
      if (!process.env.REACT_APP_APPLE_CLIENT_ID || !process.env.REACT_APP_APPLE_REDIRECT_URI) {
        throw new Error("Apple client ID or redirect URI is not set.");
      }
      const state = crypto.randomUUID();
      localStorage.setItem("apple_oauth_state", state);
      const url = new URL("https://appleid.apple.com/auth/authorize");
      url.searchParams.set("client_id", process.env.REACT_APP_APPLE_CLIENT_ID);
      url.searchParams.set(
        "redirect_uri",
        process.env.REACT_APP_APPLE_REDIRECT_URI
      );
      url.searchParams.set("response_type", "code id_token");
      url.searchParams.set("scope", "");
      url.searchParams.set("response_mode", "fragment");
      url.searchParams.set("state", state);
      window.location.href = url.toString();
    } else if (provider === "naver") {
      if (!process.env.REACT_APP_NAVER_CLIENT_ID || !process.env.REACT_APP_NAVER_REDIRECT_URI) {
        throw new Error("Naver client ID or redirect URI is not set.");
      }
      const state = crypto.randomUUID();
      localStorage.setItem("naver_oauth_state", state);
      const url = new URL("https://nid.naver.com/oauth2.0/authorize");
      url.searchParams.set("client_id", process.env.REACT_APP_NAVER_CLIENT_ID);
      url.searchParams.set(
        "redirect_uri",
        process.env.REACT_APP_NAVER_REDIRECT_URI
      );
      url.searchParams.set("response_type", "code");
      url.searchParams.set("state", state);
      window.location.href = url.toString();
    } else if (provider === "kakao") {
      if (!process.env.REACT_APP_KAKAO_REST_API_KEY || !process.env.REACT_APP_KAKAO_REDIRECT_URI) {
        throw new Error("Kakao client ID or redirect URI is not set.");
      }
      const state = crypto.randomUUID();
      localStorage.setItem("kakao_oauth_state", state);
      const url = new URL("https://kauth.kakao.com/oauth/authorize");
      url.searchParams.set(
        "client_id",
        process.env.REACT_APP_KAKAO_REST_API_KEY
      );
      url.searchParams.set(
        "redirect_uri",
        process.env.REACT_APP_KAKAO_REDIRECT_URI
      );
      url.searchParams.set("response_type", "code");
      url.searchParams.set("scope", "account_email openid");
      url.searchParams.set("state", state);
      window.location.href = url.toString();
    } else if (provider === "line") {
      if (!process.env.REACT_APP_LINE_CLIENT_ID || !process.env.REACT_APP_LINE_REDIRECT_URI) {
        throw new Error("Line client ID or redirect URI is not set.");
      }
      const state = crypto.randomUUID();
      localStorage.setItem("line_oauth_state", state);
      const url = new URL("https://access.line.me/oauth2/v2.1/authorize");
      url.searchParams.set("client_id", process.env.REACT_APP_LINE_CLIENT_ID);
      url.searchParams.set(
        "redirect_uri",
        process.env.REACT_APP_LINE_REDIRECT_URI
      );
      url.searchParams.set("response_type", "code");
      url.searchParams.set("scope", "profile openid email");
      url.searchParams.set("state", state);
      window.location.href = url.toString();
    }
  };
  const handleCallback = useCallback(
    async (provider, data) => {
      var _a;
      try {
        setLoading(true);
        setError(null);
        if (provider === "google") {
          if (!process.env.REACT_APP_GOOGLE_CLIENT_ID || !process.env.REACT_APP_GOOGLE_CLIENT_SECRET || !process.env.REACT_APP_GOOGLE_REDIRECT_URI) {
            throw new Error(
              "Google client ID, client secret or redirect URI is not set."
            );
          }
          const { code } = data;
          const getGoogleTokenData = await getGoogleToken(
            code,
            process.env.REACT_APP_GOOGLE_CLIENT_ID,
            process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
            process.env.REACT_APP_GOOGLE_REDIRECT_URI
          );
          const getGoogleTokeninfoData = await getGoogleTokeninfo(
            getGoogleTokenData.id_token
          );
          await snsLoginV2(
            getGoogleTokeninfoData.email,
            getGoogleTokenData.id_token,
            provider
          );
          navigate(RETURN_URL);
        } else if (provider === "apple") {
          if (!process.env.REACT_APP_APPLE_CLIENT_ID || !process.env.REACT_APP_APPLE_REDIRECT_URI || !process.env.REACT_APP_APPLE_TEAM_ID || !process.env.REACT_APP_APPLE_KEY_ID || !process.env.REACT_APP_APPLE_PRIVATE_KEY) {
            throw new Error(
              "Apple client ID, redirect URI, team ID, key ID or private key is not set."
            );
          }
          const { code, id_token } = data;
          await verifyAppleToken(
            id_token,
            process.env.REACT_APP_APPLE_CLIENT_ID
          );
          const APPLE_CLIENT_SECRET = await createAppleClientSecret(
            id_token,
            process.env.REACT_APP_APPLE_PRIVATE_KEY,
            process.env.REACT_APP_APPLE_TEAM_ID,
            process.env.REACT_APP_APPLE_KEY_ID
          );
          const getAppleTokenData = await getAppleToken(
            code,
            process.env.REACT_APP_APPLE_CLIENT_ID,
            APPLE_CLIENT_SECRET,
            process.env.REACT_APP_APPLE_REDIRECT_URI
          );
          const getAppleDecodedTokenData = JSON.parse(
            atob((_a = getAppleTokenData == null ? void 0 : getAppleTokenData.id_token) == null ? void 0 : _a.split(".")[1])
          );
          await verifyAppleToken(
            id_token,
            process.env.REACT_APP_APPLE_CLIENT_ID
          );
          await snsLoginV2(
            getAppleDecodedTokenData.email,
            getAppleTokenData.id_token,
            provider
          );
          navigate(RETURN_URL);
        } else if (provider === "naver") {
          if (!process.env.REACT_APP_NAVER_CLIENT_ID || !process.env.REACT_APP_NAVER_CLIENT_SECRET || !process.env.REACT_APP_NAVER_REDIRECT_URI) {
            throw new Error(
              "Naver client ID, client secret or redirect URI is not set."
            );
          }
          const { code } = data;
          const getNaverTokenData = await getNaverToken(
            code,
            process.env.REACT_APP_NAVER_CLIENT_ID,
            process.env.REACT_APP_NAVER_CLIENT_SECRET,
            process.env.REACT_APP_NAVER_REDIRECT_URI
          );
          const getNaverTokeninfoData = await getNaverTokeninfo(
            getNaverTokenData.access_token
          );
          await snsLoginV2(
            getNaverTokeninfoData.response.email,
            getNaverTokenData.access_token,
            provider
          );
          navigate(RETURN_URL);
        } else if (provider === "kakao") {
          if (!process.env.REACT_APP_KAKAO_REST_API_KEY || !process.env.REACT_APP_KAKAO_REDIRECT_URI) {
            throw new Error("Kakao client ID or redirect URI is not set.");
          }
          const { code } = data;
          const getKakaoTokenData = await getKakaoToken(
            code,
            process.env.REACT_APP_KAKAO_REST_API_KEY,
            process.env.REACT_APP_KAKAO_REDIRECT_URI
          );
          await verifyKakaoToken(
            getKakaoTokenData.id_token,
            process.env.REACT_APP_KAKAO_REST_API_KEY
          );
          const getKakaoTokeninfoData = await getKakaoTokeninfo(
            getKakaoTokenData.access_token
          );
          await snsLoginV2(
            getKakaoTokeninfoData.kakao_account.email,
            getKakaoTokenData.id_token,
            provider
          );
          navigate(RETURN_URL);
        } else if (provider === "line") {
          if (!process.env.REACT_APP_LINE_CLIENT_ID || !process.env.REACT_APP_LINE_CLIENT_SECRET || !process.env.REACT_APP_LINE_REDIRECT_URI) {
            throw new Error(
              "Line client ID, client secret or redirect URI is not set."
            );
          }
          const { code } = data;
          const getLineTokenData = await getLineToken(
            code,
            process.env.REACT_APP_LINE_CLIENT_ID,
            process.env.REACT_APP_LINE_CLIENT_SECRET,
            process.env.REACT_APP_LINE_REDIRECT_URI
          );
          const getLineTokeninfoData = await getLineTokeninfo(
            getLineTokenData.id_token,
            process.env.REACT_APP_LINE_CLIENT_ID
          );
          await snsLoginV2(
            getLineTokeninfoData.email,
            getLineTokenData.id_token,
            provider
          );
          navigate(RETURN_URL);
        } else {
          throw new Error("Invalid provider.");
        }
      } catch (error2) {
        if (errorSnsLogin) {
          setError(errorSnsLogin);
        }
        if (error2) {
          setError(error2);
        }
      } finally {
        setLoading(false);
      }
    },
    [snsLoginV2, errorSnsLogin, navigate]
  );
  useEffect(() => {
    const provider = localStorage.getItem("provider");
    if (provider === "google") {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      const returnedState = params.get("state");
      const storedState = localStorage.getItem("google_oauth_state");
      const data = {
        code
      };
      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    } else if (provider === "apple") {
      const hashParams = new URLSearchParams(location.hash.slice(1));
      const code = hashParams.get("code");
      const id_token = hashParams.get("id_token");
      const returnedState = hashParams.get("state");
      const storedState = localStorage.getItem("apple_oauth_state");
      const data = {
        code,
        id_token
      };
      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    } else if (provider === "naver") {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      const returnedState = params.get("state");
      const storedState = localStorage.getItem("naver_oauth_state");
      const data = {
        code
      };
      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    } else if (provider === "kakao") {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      const returnedState = params.get("state");
      const storedState = localStorage.getItem("kakao_oauth_state");
      const data = {
        code
      };
      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    } else if (provider === "line") {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      const returnedState = params.get("state");
      const storedState = localStorage.getItem("line_oauth_state");
      const data = {
        code
      };
      if (code && returnedState === storedState) {
        handleCallback(provider, data);
      }
    }
  }, [handleCallback, location.search, location.hash]);
  return /* @__PURE__ */ jsxs("div", { style: containerStyle, children: [
    /* @__PURE__ */ jsx("div", { style: titleContainerStyle, children: /* @__PURE__ */ jsx("h2", { style: { textAlign: "center", marginBottom: "24px" }, children: "OAuth2 Login" }) }),
    /* @__PURE__ */ jsxs("div", { style: contentContainerStyle, children: [
      providers.map((item) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleRedirect(item.type),
          disabled: loading,
          style: __spreadProps(__spreadValues({}, buttonBaseStyle), {
            backgroundColor: item.backgroundColor,
            color: item.textColor,
            border: item.border
          }),
          onMouseEnter: (event) => event.currentTarget.style.backgroundColor = item.hoverColor,
          onMouseLeave: (event) => event.currentTarget.style.backgroundColor = item.backgroundColor,
          children: loading && serviceSnsLogin === item.type ? /* @__PURE__ */ jsx(
            "img",
            {
              src: animation_loading_default,
              alt: "loading",
              style: { width: "24px", height: "24px" }
            }
          ) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: item.icon,
                alt: `${item.type} icon`,
                style: {
                  width: "24px",
                  height: "24px",
                  marginRight: "12px"
                }
              }
            ),
            item.label
          ] })
        },
        item.type
      )),
      (error == null ? void 0 : error.message) && /* @__PURE__ */ jsx(
        "span",
        {
          style: {
            color: "red",
            textAlign: "center",
            display: "block",
            width: "100%"
          },
          children: error.message
        }
      )
    ] })
  ] });
}
/*! Bundled license information:

@remix-run/router/dist/router.js:
  (**
   * @remix-run/router v1.23.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router/dist/index.js:
  (**
   * React Router v6.30.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/index.js:
  (**
   * React Router DOM v6.30.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/

export { Login };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map