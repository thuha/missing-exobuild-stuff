eXo.require("eXo.projects.Module") ;
eXo.require("eXo.projects.Product") ;

function getModule(params) {
  var module = new Module();

  module.version = "2.4.0-CR1";
  module.relativeMavenRepo =  "org/exoplatform/kernel" ;
  module.relativeSRCRepo =  "kernel" ;
  module.name = "kernel" ;
    
  module.commons = 
    new Project("org.exoplatform.kernel", "exo.kernel.commons", "jar", module.version).
    addDependency(new Project("commons-lang", "commons-lang", "jar", "2.6")).
    addDependency(new Project("eu.medsea.mimeutil", "mime-util", "jar", "2.1.3")).
    addDependency(new Project("xpp3", "xpp3", "jar", "1.1.4c"));
    
  module.container = 
    new Project("org.exoplatform.kernel", "exo.kernel.container", "jar", module.version).
    addDependency(module.commons).
    addDependency(new Project("picocontainer", "picocontainer", "jar", "1.1")).
    addDependency(new Project("commons-beanutils", "commons-beanutils", "jar", "1.8.3")).
    addDependency(new Project("org.jibx", "jibx-run", "jar", "1.2.4.5")).
    addDependency(new Project("org.jibx", "jibx-bind", "jar", "1.2.4.5"));

  module.component = {};
  module.component.common = 
    new Project("org.exoplatform.kernel", "exo.kernel.component.common", "jar", module.version).
    addDependency(new Project("commons-collections", "commons-collections", "jar", "3.2")).
    addDependency(new Project("org.quartz-scheduler", "quartz", "jar", "2.1.6")).
    addDependency(new Project("javax.activation", "activation", "jar", "1.1.1")).
    addDependency(new Project("javax.mail", "mail", "jar", "1.4.4"));

  module.component.command = 
    new Project("org.exoplatform.kernel", "exo.kernel.component.command", "jar", module.version).
    addDependency(new Project("commons-chain", "commons-chain", "jar", "1.2")).
    addDependency(new Project("commons-digester", "commons-digester", "jar", "1.8.1"));
    
  module.component.cache = 
    new Project("org.exoplatform.kernel", "exo.kernel.component.cache", "jar", module.version) ;
  
  return module;
}
