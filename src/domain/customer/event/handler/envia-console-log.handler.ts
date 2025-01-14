import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    const { eventData } = event;
    console.log(`Endereço do cliente: ${eventData.id}, ${eventData.name} \
alterado para: Rua ${eventData.address.street}, ${eventData.address.number}, ${eventData.address.city} - ${eventData.address.zipcode}.`);
  }
}
