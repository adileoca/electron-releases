function manageSession(broadcast) {
  let sessionData = null;

  function setSession(session) {
    sessionData = session;
    broadcast({ type: "session", data: session });
  }

  function getSession() {
    return sessionData;
  }

  return { setSession, getSession };
}

module.exports = { manageSession };
