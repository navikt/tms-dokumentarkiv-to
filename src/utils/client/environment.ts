const isDevelopmentClientSide = window.location.href.includes("intern.dev.nav.no");
const isAnsattClientSide = window.location.href.includes("ansatt.dev.nav.no");
const isLocalClientSide = window.location.href.includes("localhost");;

export const getEnvironmentClientSide = () => {
  if (isLocalClientSide) {
    return "local";
  }

  if (isDevelopmentClientSide) {
    return "dev";
  }

  if(isAnsattClientSide) {
    return "ansatt";
  }

  return "prod";
};

