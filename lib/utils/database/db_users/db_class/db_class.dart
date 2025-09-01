import 'dart:convert';
import 'package:http/http.dart' as http;

class DbClass {
  final String baseUrl = 'http://localhost:3000/class';

  Future<List<dynamic>> getClass() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load class');
    }
  }

  Future<dynamic> getClassById(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/$id'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else if (response.statusCode == 404) {
      throw Exception('Class not found');
    } else {
      throw Exception('Failed to load class');
    }
  }

  Future<void> createClass(int period, String subject) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{'period': period, 'subject': subject}),
    );

    if (response.statusCode != 201) {
      throw Exception('Falha ao criar o class');
    }
  }

  Future<void> updateClass(int id, int newPeriod, String newSubject) async {
    final response = await http.put(
      Uri.parse('$baseUrl/$id'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'period': newPeriod,
        'subject': newSubject,
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Falha ao atualizar o class');
    }
  }

  Future<void> deleteClass(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/$id'));

    if (response.statusCode != 200) {
      throw Exception('Falha ao deletar o class');
    }
  }
}
