import * as Services from "./api/services";
import * as Customers from "./api/customers";
import * as Orders from "./api/orders";
import * as Payments from "./api/payments";
import * as Dashboard from "./api/dashboard";
import * as Settings from "./api/settings";
import * as Reports from "./api/reports";
import * as Whatsapp from "./api/whatsapp";

export default {

  async fetch(request, env) {

    const url = new URL(request.url);

    // MASTER LAYANAN
    if (url.pathname.startsWith("/api/services")) {
      return Services.handle(request, env);
    }

    // MASTER PELANGGAN
    if (url.pathname.startsWith("/api/customers")) {
      return Customers.handle(request, env);
    }

    // ORDER
    if (url.pathname.startsWith("/api/orders")) {
      return Orders.handle(request, env);
    }

    // PEMBAYARAN
    if (url.pathname.startsWith("/api/payments")) {
      return Payments.handle(request, env);
    }

    // DASHBOARD
    if (url.pathname.startsWith("/api/dashboard")) {
      return Dashboard.handle(request, env);
    }

    // SETTINGS
    if (url.pathname.startsWith("/api/settings")) {
      return Settings.handle(request, env);
    }

    // LAPORAN
    if (url.pathname.startsWith("/api/reports")) {
      return Reports.handle(request, env);
    }

    // WHATSAPP
    if (url.pathname.startsWith("/api/whatsapp")) {
      return Whatsapp.handle(request, env);
    }

    // FILE HTML/CSS/JS
    return env.ASSETS.fetch(request);

  }

}
