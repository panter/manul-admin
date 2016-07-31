import _ from 'lodash';

/*
export default class Admin {
  constructor({Meteor, Counts, gotoRoute, components) {
    this.collections = new Map();
    this.Counts = Counts;
    this.Meteor = Meteor;
    this.gotoRoute = gotoRoute;

    this.allowRules = [];
    this.components = components;
    this.initPublications();
  }
  addCollection(name, collection, {filteredFields = [], components = {}, allowRules = []} = {}) {
    this.collections.set(name, {collection, filteredFields, components, allowRules});
  }
  getEditPublicationName(name) {
    return `admin.${name}.edit`;
  }
  getListPublicationName(name) {
    return `admin.${name}.list`;
  }

  getMatchingResultsCountName(name) {
    return `admin.${name}.counts`;
  }

  addAllowRule(rule) {
    this.allowRules.push(rule);
  }

  initPublications() {
    if (this.Meteor.isServer) {
      for (const [ name, {allowRules, collection} ] of this.collections) {
        this.Meteor.publish(this.getListPublicationName(name), function (query, options) {
          const rules = this.allowRules.concat(allowRules);
          if (_.some(rules, allowed => allowed(this.userId))) {
            // can't reuse "users" cursor
            this.Counts.publish(this, this.getMatchingResultsCountName(name), collection.find(query, options));
            return collection.find(query, options);
          }
        });
        this.Meteor.publish(this.getEditPublicationName(name), function (_id) {
          const rules = this.allowRules.concat(allowRules);
          if (_.some(rules, allowed => allowed(this.userId))) {
            return collection.find(_id);
          }
        });
      }
    }
  }

  _getProps(name) {
    const matchingResultsCount = this.getMatchingResultsCountName(name);
    const publication = this.getListPublicationName(name);
    const {collection, filteredFields, components = {}} = this.collections.get(name);
    return {
      gotoCreate: () => this.gotoRoute(this.getCreateRoute(name).name),
      gotoEdit: (_id) => this.gotoRoute(this.getEditRoute(name).name, {_id}),
      gotoList: () => this.gotoRoute(this.getListRoute(name).name),
      collection,
      filteredFields,
      matchingResultsCount,
      publication,
      components: {
        ...this.components,
        ...components // override
      }
    };
  }

  getListRoute(name) {
    const {components, ...props} = this._getProps(name);
    return {
      name: `admin.${name}.index`,
      path: `/${name}`,
      Component: components.List,
      props,
    }
  }
  getEditRoute(name) {
    const {components, ...props} = this._getProps(name);
    return {
      name: `admin.${name}.edit`,
      path: `/${name}/:_id`,
      Component: components.Edit,
      props,
    }
  }
  getCreateRoute(name) {
    const {components, ...props} = this._getProps(name);
    return {
      name: `admin.${name}.create`,
      path: `/${name}/create`,
      Component: components.Create,
      props,
    }
  }

  createMantraModule({FlowRouter, action}) {
    const routes = (injectDeps) => {
      for (const {path, name, props} of this.getRoutes()) {
        FlowRouter.route(path, {
          name,
          action(params) {
            mount(MainLayoutCtx, {
              content: () => (<Component {...props} params={params} />)
            })
          }
        });
      }
    }
  }
  getRoutes() {
    const routes = []
    for (name of this.collections.keys()) {
      routes.push(this.getListRoute(name));
      routes.push(this.getEditRoute(name));
      routes.push(this.getCreateRoute(name));
    }
    return routes;
  }

}
*/
