eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {
  var core = params.core;
  var ws = params.ws;

  var module = {} ;
  
  module.version = "1.15.0-CR1" ; //
  module.relativeMavenRepo =  "org/exoplatform/jcr" ;
  module.relativeSRCRepo =  "jcr/trunk" ;
  module.name =  "jcr" ;
    
  module.services = {}
  module.services.jcr = 
    new Project("org.exoplatform.jcr", "exo.jcr.component.core", "jar", module.version).
    addDependency(new Project("org.exoplatform.jcr", "exo.jcr.component.ext", "jar", module.version)).
    addDependency(new Project("org.exoplatform.jcr", "exo.jcr.component.webdav", "jar", module.version)).
    addDependency(new Project("org.exoplatform.jcr", "exo.jcr.component.ftp", "jar", module.version)) .
    addDependency(core.component.documents) .
    addDependency(new Project("javax.jcr", "jcr", "jar", "1.0")).
    addDependency(new Project("concurrent", "concurrent", "jar", "1.3.4")).
    addDependency(new Project("org.jgroups", "jgroups", "jar", "2.6.20.Final")).
    addDependency(new Project("org.jboss.cache","jbosscache-core","jar","3.2.7.GA")).
    addDependency(new Project("org.jboss.jbossts","jbossjta","jar","4.16.4.Final")).
    addDependency(new Project("org.apache.ws.commons","ws-commons-util","jar","1.0.1")).
    addDependency(new Project("org.apache.lucene", "lucene-core", "jar", "3.5.0")).
    addDependency(new Project("org.apache.lucene", "lucene-spellchecker", "jar", "3.5.0")).
    addDependency(new Project("org.apache.lucene", "lucene-wordnet", "jar", "3.3.0")).
    addDependency(new Project("org.apache.lucene", "lucene-memory", "jar", "3.5.0"));

  module.frameworks = {}
  module.frameworks.web = 
    new Project("org.exoplatform.jcr", "exo.jcr.framework.web", "jar", module.version).  
    addDependency(ws.rest);

  module.frameworks.command = new Project("org.exoplatform.jcr", "exo.jcr.framework.command", "jar", module.version).
    addDependency(new Project("commons-fileupload", "commons-fileupload", "jar", "1.2.1")); 
    
  return module ;
}
