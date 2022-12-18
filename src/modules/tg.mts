import { readFileSync } from "fs";
import { Bot as TgBot, InlineKeyboard } from "grammy";
import { countryCodeEmoji } from "country-code-emoji";
import { Spider } from "./spider.mjs";
import { V2Object } from "../utils/types.mjs";

class Bot {
  bot = new TgBot(readFileSync("./bot_token").toString());
  private channelId = "-781424134";

  private async make(account: V2Object, total: number) {
    let message: string = "---------------------------\n";
    message += "Akun Gratis | Free Accounts\n";
    message += "---------------------------\n";
    message += `Jumlah/Count: ${total} 🌾\n`;
    message += `Regional/Region: ${account.region} ${account.cc} ${countryCodeEmoji(account.cc as string)}\n`;
    message += "---------------------------\n";
    message += "Info:\n";
    message += `Type: <code>${account.vpn}</code>\n`;
    message += `Remark: <code>${account.remark}</code>\n`;
    message += `Address: <code>${account.address}</code>\n`;
    message += `Port: <code>${account.port}</code>\n`;
    message += `Network: <code>${account.network || "tcp"}</code>\n`;
    message += `Host: <code>${account.host || ""}</code>\n`;
    message += `Path: <code>${account.path || ""}</code>\n`;
    message += `TLS: <code>${account.tls ? true : false}</code>\n`;
    message += `Mode: <code>${account.cdn ? "CDN" : "SNI"}</code>\n`;
    message += `SNI: <code>${account.sni || account.host || ""}</code>\n\n`;
    message += `⌜<code>${new Spider(account).toURL()}</code>⌟\n\n`;
    message += `Config: <a href="https://github.com/dickymuliafiqri/Manssizz/tree/main/resources/config">Config Example</a>\n`;
    message += `Sub: <a href="https://github.com/dickymuliafiqri/Manssizz/tree/main/result">Subscription</a>\n`;

    return message;
  }

  async sendToChannel(account: V2Object, total: number) {
    const message = await this.make(account, total);

    await this.bot.api.sendMessage(this.channelId, message, {
      disable_web_page_preview: true,
      parse_mode: "HTML",
      reply_markup: new InlineKeyboard()
        .url("-", "www.google.com")
        .row()
        .url("-", "www.google.com")
        .row(),
    });
  }
}

const bot = new Bot();
export 

bot };
