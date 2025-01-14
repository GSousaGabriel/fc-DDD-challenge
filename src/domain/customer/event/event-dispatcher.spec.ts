import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import AddressChangedEvent from "./address-changed.event";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log-2.handler";
import { vi } from "vitest";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";

describe("Domain events tests", () => {
  test("should log when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    const spyEventHandler = vi.spyOn(eventHandler, "handle");
    const spyEventHandler2 = vi.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "12",
      name: "Product 1"
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  test("should log when address changes", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = vi.spyOn(eventHandler, "handle");

    eventDispatcher.register("AddressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["AddressChangedEvent"][0]
    ).toMatchObject(eventHandler);

    const addressChangedEvent = new AddressChangedEvent({
      id: "12",
      name: "John Doe",
      address: {
        street: "Street 1",
        number: 1,
        zipcode: "Zipcode 1",
        city: "City 1"
      }
    });

    eventDispatcher.notify(addressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
