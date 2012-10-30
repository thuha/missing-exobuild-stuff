/**
 * Copyright (C) 2009 eXo Platform SAS.
 * 
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 * 
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */

eXo.require("eXo.projects.Module");
eXo.require("eXo.projects.Product");

function getModule(params)
{

   var kernel = params.kernel;
   var core = params.core;
   var jcr = params.eXoJcr;
   var ws = params.ws;
   var module = new Module();

   module.version = "${project.version}";
   module.relativeMavenRepo = "org/exoplatform/portal";
   module.relativeSRCRepo = "portal";
   module.name = "portal";
   
   var mopVersion =  "${org.gatein.mop.version}";
   var chromatticVersion =  "${version.chromattic}";
   var reflextVersion =  "${version.reflext}";
   var idmVersion = "${org.picketlink.idm}";
   var pcVersion = "${org.gatein.pc.version}";
   var wciVersion = "${org.gatein.wci.version}";
   var commonVersion = "${org.gatein.common.version}";
   var wsrpVersion = "${org.gatein.wsrp.version}";
   var shindigVersion = "${org.shindig.version}";
   var groovyVersion = "${org.codehaus.groovy.version}";
   var rhinoVersion = "${rhino.version}";
   var jcipVersion = "${jcip.version}";
   var simplecapthaVersion = "${nl.captcha.simplecaptcha.version}";
   var staxnavVersion = "${org.staxnav.version}";
   var mgmtVersion = "${org.gatein.mgmt.version}";
   var googleJSVersion = "${com.google.javascript.version}";

   //TODO versions for gatein components
   
   module.component = {}
   module.component.resources =
   new Project("org.gatein.portal", "exo.portal.component.resources", "jar", module.version);

   module.component.common =
   new Project("org.gatein.portal", "exo.portal.component.common", "jar", module.version).
      addDependency(new Project("org.gatein.common", "common-logging", "jar", commonVersion));

   module.component.pc =
   new Project("org.gatein.portal", "exo.portal.component.pc", "jar", module.version).
      addDependency(new Project("javax.portlet", "portlet-api", "jar", "2.0")).
      addDependency(new Project("javax.ccpp", "ccpp", "jar", "1.0")).
      addDependency(new Project("org.gatein.pc", "pc-api", "jar", pcVersion)).
      addDependency(new Project("org.gatein.pc", "pc-bridge", "jar", pcVersion)).
      addDependency(new Project("org.gatein.pc", "pc-portlet", "jar", pcVersion)).
      addDependency(new Project("org.gatein.pc", "pc-controller", "jar", pcVersion)).
      addDependency(new Project("org.gatein.pc", "pc-federation", "jar", pcVersion)).
      addDependency(new Project("org.gatein.wci", "wci-wci", "jar", wciVersion)).
      addDependency(new Project("org.gatein.wci", "wci-exo", "jar", "2.2.0-Beta02")).
      addDependency(new Project("org.gatein.common", "common-common", "jar", commonVersion)).
      addDependency(new Project("log4j", "log4j", "jar", "1.2.14")).
      addDependency(new Project("org.jboss", "jbossxb", "jar", "2.0.1.GA")).
      addDependency(new Project("org.jboss.logging", "jboss-logging-spi", "jar", "2.0.5.GA")).
      addDependency(new Project("org.apache.portals.bridges", "portals-bridges-common", "jar", "1.0.4")).
      addDependency(new Project("org.jboss", "jboss-common-core", "jar", "2.2.9.GA"));

   if(eXo.server.Tomcat || eXo.server.Jboss || eXo.server.JbossEar)
   {
     module.component.pc.addDependency(new Project("org.gatein.wci", "wci-tomcat7", "jar", wciVersion));
   }


   if(eXo.server.Jboss || eXo.server.JbossEar)
   {
     module.wsrp = {};
     module.wsrp.extension = new Project("org.gatein.integration", "extension-ear-as5", "ear", module.version);
   }


   module.component.scripting =
   new Project("org.gatein.portal", "exo.portal.component.scripting", "jar", module.version).
      addDependency(new Project("rhino", "js", "jar", rhinoVersion)).
      addDependency(new Project("org.codehaus.groovy", "groovy-all", "jar", groovyVersion));

   module.component.management =
   new Project("org.gatein.portal", "exo.portal.component.management", "jar", module.version).
      addDependency(new Project("org.gatein.management", "gatein-management-core", "jar", mgmtVersion)).
      addDependency(new Project("org.gatein.management", "gatein-management-api", "jar", mgmtVersion)).
      addDependency(new Project("org.gatein.management", "gatein-management-spi", "jar", mgmtVersion)).
      addDependency(new Project("org.gatein.management", "gatein-management-rest", "jar", mgmtVersion));

   module.component.web = {}
   module.component.web.controller =
   new Project("org.gatein.portal", "exo.portal.component.web.controller", "jar", module.version).
      addDependency(module.component.common).
      addDependency(new Project("org.staxnav", "staxnav.core", "jar", staxnavVersion));

   module.component.web.security =
   new Project("org.gatein.portal", "exo.portal.component.web.security", "jar", module.version).
      addDependency(module.component.web.controller).
      addDependency(module.component.scripting);

   module.component.web.server =
   new Project("org.gatein.portal", "exo.portal.component.web.server", "jar", module.version).
      addDependency(module.component.web.controller).
      addDependency(module.component.scripting);

    module.component.web.resources =
    new Project("org.gatein.portal", "exo.portal.component.web.resources", "jar", module.version).
      addDependency(new Project("com.google.javascript", "closure-compiler", "jar", googleJSVersion));

   module.component.web.api =
   new Project("org.gatein.portal", "exo.portal.component.web.api", "jar", module.version);
   
   module.component.portal =
   new Project("org.gatein.portal", "exo.portal.component.portal", "jar", module.version).
      addDependency(new Project("org.gatein.mop", "mop-api", "jar", mopVersion)).
      addDependency(new Project("org.gatein.mop", "mop-spi", "jar", mopVersion)).
      addDependency(new Project("org.gatein.mop", "mop-core", "jar", mopVersion)).
      addDependency(new Project("org.chromattic", "chromattic.api", "jar", chromatticVersion)).
      addDependency(new Project("org.chromattic", "chromattic.common", "jar", chromatticVersion)).
      addDependency(new Project("org.chromattic", "chromattic.spi", "jar", chromatticVersion)).
      addDependency(new Project("org.chromattic", "chromattic.metamodel", "jar", chromatticVersion)).
      addDependency(new Project("org.chromattic", "chromattic.core", "jar", chromatticVersion)).
      addDependency(new Project("org.chromattic", "chromattic.apt", "jar", chromatticVersion)).
      addDependency(new Project("org.chromattic", "chromattic.ext", "jar", chromatticVersion)).
      addDependency(new Project("org.reflext", "reflext.api", "jar", reflextVersion)).
      addDependency(new Project("org.reflext", "reflext.core", "jar", reflextVersion)).
      addDependency(new Project("org.reflext", "reflext.spi", "jar", reflextVersion)).
      addDependency(new Project("org.reflext", "reflext.jlr", "jar", reflextVersion)).
      addDependency(new Project("org.reflext", "reflext.api", "jar", reflextVersion)).
      addDependency(module.component.web.security);

   module.component.identity =
   new Project("org.gatein.portal", "exo.portal.component.identity", "jar", module.version).
      addDependency(new Project("org.picketlink.idm", "picketlink-idm-core", "jar", idmVersion)).
      addDependency(new Project("org.picketlink.idm", "picketlink-idm-common", "jar", idmVersion)).
      addDependency(new Project("org.picketlink.idm", "picketlink-idm-api", "jar", idmVersion)).
      addDependency(new Project("org.picketlink.idm", "picketlink-idm-spi", "jar", idmVersion)).
      addDependency(new Project("org.picketlink.idm", "picketlink-idm-hibernate", "jar", idmVersion)).
      addDependency(new Project("org.picketlink.idm", "picketlink-idm-ldap", "jar", idmVersion)).
      addDependency(new Project("org.picketlink.idm", "picketlink-idm-cache", "jar", idmVersion));

   module.component.applicationRegistry =
   new Project("org.gatein.portal", "exo.portal.component.application-registry", "jar", module.version).
      addDependency(module.component.portal);
   
   module.component.redirect =
   new Project("org.gatein.web", "redirect", "jar", module.version);

   module.webui = {};
   module.webui.framework =
   new Project("org.gatein.portal", "exo.portal.webui.framework", "jar", module.version).
      addDependency(module.component.web.server).
      addDependency(module.component.web.security).
      addDependency(module.component.web.api).
      addDependency(module.component.web.resources).
      addDependency(module.component.web.controller);

   module.webui.portlet =
   new Project("org.gatein.portal", "exo.portal.webui.portlet", "jar", module.version).
      addDependency(module.webui.framework);

   module.webui.core =
   new Project("org.gatein.portal", "exo.portal.webui.core", "jar", module.version).
      addDependency(module.webui.portlet);

   module.webui.eXo =
   new Project("org.gatein.portal", "exo.portal.webui.eXo", "jar", module.version).
      addDependency(module.component.applicationRegistry).
      addDependency(module.webui.core);

   module.webui.portal =
   new Project("org.gatein.portal", "exo.portal.webui.portal", "jar", module.version).
      addDependency(module.component.common).
      addDependency(module.component.management).
      addDependency(module.component.resources).
      addDependency(module.component.identity).
      addDependency(module.component.pc).
      addDependency(module.webui.eXo).

      addDependency(kernel.container).
      addDependency(kernel.component.common).
      addDependency(kernel.component.cache).
      addDependency(kernel.component.command).
      addDependency(new Project("org.exoplatform.kernel", "exo.kernel.component.ext.cache.impl.jboss.v3", "jar", kernel.version)).       

      addDependency(core.component.database).
      addDependency(core.component.organization).
      addDependency(core.component.organization.ldap).
      addDependency(core.component.ldap).
      addDependency(core.component.security.core).
      addDependency(core.component.xmlProcessing).
      addDependency(core.component.documents).

      addDependency(jcr.services.jcr).
      addDependency(new Project("org.gatein.captcha", "simplecaptcha", "jar", simplecapthaVersion)).
      addDependency(new Project("com.jhlabs", "filters", "jar", "2.0.235")); 


   module.portlet = {};

   module.portlet.exoadmin =
   new Project("org.gatein.portal", "exo.portal.portlet.exoadmin", "exo-portlet", module.version);

   module.portlet.web =
   new Project("org.gatein.portal", "exo.portal.portlet.web", "exo-portlet", module.version);

   module.portlet.dashboard =
   new Project("org.gatein.portal", "exo.portal.portlet.dashboard", "exo-portlet", module.version).
      addDependency(new Project("org.gatein.portal", "exo.portal.webui.dashboard", "jar", module.version));

   module.portlet.redirect =
   new Project("org.gatein.portal.portlet", "redirect", "war", module.version).
      addDependency(module.component.redirect);
   module.portlet.redirect.deployName= "redirect-portlet";

   module.sample = {};

   module.sample.skin = new Project("org.gatein.portal.examples.skins", "gatein-sample-skin", "war", module.version);

   module.eXoGadgetServer =
   new Project("org.gatein.portal", "exo.portal.gadgets-server", "war", module.version).
      addDependency(new Project("commons-io", "commons-io", "jar", "1.4")).
      addDependency(new Project("commons-codec", "commons-codec", "jar", "1.4")).
      addDependency(new Project("net.oauth.core", "oauth", "jar", "20100527")).
      addDependency(new Project("net.oauth.core", "oauth-provider", "jar", "20100527")).
      addDependency(new Project("net.oauth.core", "oauth-consumer", "jar", "20090617")).
      addDependency(new Project("net.oauth.core", "oauth-httpclient4", "jar", "20090913")).
      addDependency(new Project("com.google.guava", "guava", "jar", "r09")).
      addDependency(new Project("com.google.inject", "guice", "jar", "2.0")).
      addDependency(new Project("com.google.inject.extensions", "guice-jmx", "jar", "2.0")).
      addDependency(new Project("com.google.inject.extensions", "guice-multibindings", "jar", "2.0")).
      addDependency(new Project("org.apache.httpcomponents", "httpclient", "jar", "4.0.1")).
      addDependency(new Project("org.apache.httpcomponents", "httpcore", "jar", "4.0.1")).
      addDependency(new Project("rome", "rome", "jar", "1.0")).
      addDependency(new Project("joda-time", "joda-time", "jar", "1.6")).
      addDependency(new Project("org.json", "json", "jar", "20070829")).
      addDependency(new Project("org.gatein.shindig", "shindig-common", "jar", shindigVersion)).
      addDependency(new Project("org.gatein.shindig", "shindig-gadgets", "jar", shindigVersion)).
      addDependency(new Project("org.gatein.shindig", "shindig-features", "jar", shindigVersion)).
      addDependency(new Project("org.gatein.shindig", "shindig-social-api", "jar", shindigVersion)).
      addDependency(new Project("jdom", "jdom", "jar", "1.0")).
      addDependency(new Project("commons-httpclient", "commons-httpclient", "jar", "3.1")).
      addDependency(new Project("net.sf.ehcache", "ehcache", "jar", "1.6.0")).
      addDependency(new Project("com.ibm.icu", "icu4j", "jar", "3.8")).
      addDependency(new Project("net.sourceforge.nekohtml", "nekohtml", "jar", "1.9.14")).
      addDependency(new Project("xerces", "xercesImpl", "jar", "2.9.1")).
      addDependency(new Project("com.thoughtworks.xstream", "xstream", "jar", "1.3.1")).
      addDependency(new Project("caja", "caja", "jar", "r4251")).
      addDependency(new Project("caja", "json_simple", "jar", "r1")).
      addDependency(new Project("org.apache.sanselan", "sanselan", "jar", "0.97-incubator")).
      addDependency(new Project("de.odysseus.juel", "juel-api", "jar", "2.1.2")).
      addDependency(new Project("de.odysseus.juel", "juel-impl", "jar", "2.1.2")).
      addDependency(new Project("org.jsecurity", "jsecurity", "jar", "0.9.0")).
      addDependency(new Project("aopalliance", "aopalliance", "jar", "1.0")).
      addDependency(new Project("org.gatein.portal", "exo.portal.gadgets-core", "jar", module.version));
   module.eXoGadgetServer.deployName = "eXoGadgetServer";

   module.eXoGadgets = new Project("org.gatein.portal", "exo.portal.eXoGadgets", "war", module.version);
   module.eXoGadgets.deployName = "eXoGadgets";

   module.web = {}
   module.web.eXoResources =
   new Project("org.gatein.portal", "exo.portal.web.eXoResources", "war", module.version);
   module.web.rest =
   new Project("org.gatein.portal", "exo.portal.web.rest", "war", module.version).
      addDependency(ws.frameworks.servlet);

   module.web.portal =
   new Project("org.gatein.portal", "exo.portal.web.portal", "exo-portal", module.version).
      addDependency(jcr.frameworks.web).
      addDependency(jcr.frameworks.command);


   module.server = {}

   module.server.tomcat = {}
   module.server.tomcat.patch =
   new Project("org.gatein.portal", "exo.portal.server.tomcat.patch", "jar", module.version);

   module.server.jboss = {}
   module.server.jboss.patch =
   new Project("org.gatein.portal", "exo.portal.server.jboss.patch", "jar", module.version);

   module.server.jbossear = {}
   module.server.jbossear.patch =
   new Project("org.gatein.portal", "exo.portal.server.jboss.patch-ear", "jar", module.version);

   module.sample.extension =
   new Project("org.gatein.portal", "gatein-sample-extension", "ear", module.version).
   addDependency(new Project("org.gatein.portal", "gatein-sample-portal", "ear", module.version)).
   addDependency(new Project("org.gatein.portal", "starter-gatein", "ear", module.version));

   <!-- needed so that GTN can be run on the IBM jdk, to be removed when the IBM jdk no longer needs this hack -->
   module.ibm = {};
   module.ibm.jdk = {};
   module.ibm.jdk.support =new Project("net.jcip", "jcip-annotations", "jar", jcipVersion);

   return module;
}
